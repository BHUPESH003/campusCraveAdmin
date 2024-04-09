import React, { useState } from "react";
import {
  CButton,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CFormTextarea,
  CFormCheck,
} from "@coreui/react";
import { useNavigate } from "react-router-dom";
// import { dataService } from "../../services/apiServices/dataService";
// import AWS from "aws-sdk";
import { envKey } from "src/Url";
const AddNewCategory = () => {
  const navigate = useNavigate();
  //   AWS.config.update({
  //     accessKeyId: "YOUR_ACCESS_KEY_ID",
  //     secretAccessKey: "YOUR_SECRET_ACCESS_KEY",
  //     region: "YOUR_AWS_REGION",
  //   });

  //   const s3 = new AWS.S3();

  const [formData, setFormData] = useState({
    category: "",
    imageUrl: [],
  });

  const Foldername = "Categories";

  const handleChange = (e, index) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      const imagesArray = Array.from(files);
      setFormData((prevData) => ({ ...prevData, [name]: imagesArray }));
    } else if (name.startsWith("coupon")) {
      // Handling changes for discount coupon codes
      const updatedData = [...formData.discountCouponCode];
      const property = name.split(index)[0];
      updatedData[index] = { ...updatedData[index], [property]: value };
      setFormData((prevData) => ({
        ...prevData,
        discountCouponCode: updatedData,
      }));
    } else {
      // If it's a regular input, update the state
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  // Function to render image previews
  const renderImagePreviews = () => {
    if (formData.imagePreviews) {
      return (
        <CContainer>
          <CRow>
            {formData.imagePreviews.map((preview, index) => (
              <CCol key={index} className="my-3">
                <img
                  className="img-fluid"
                  src={preview}
                  alt={`Preview ${index}`}
                  style={{
                    width: "100px",
                    height: "auto",
                    marginRight: "10px",
                  }}
                />
              </CCol>
            ))}
          </CRow>
        </CContainer>
      );
    }
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    const imagesArray = Array.from(files);

    setFormData((prevData) => ({
      ...prevData,
      imageUrl: [...prevData.imageUrl, ...imagesArray], // Append new images to existing imageUrl array
    }));
    // Read each image file and create a preview URL
    const newImagePreviews = imagesArray.map((image) =>
      URL.createObjectURL(image)
    );

    // Update the form state with the new image previews along with preserving existing ones
    setFormData((prevData) => ({
      ...prevData,
      imagePreviews: [...(prevData.imagePreviews || []), ...newImagePreviews],
    }));
  };


  const uploadImages = async () => {
    try {
      const folderName = Foldername; // Get folderName from formData
      // Extract only the image file names from formData
      const requestData = {
        uploadedDocuments: formData.imageUrl.map((image) => ({
          fileName: image.name,
        })),
        folderName: folderName,
      };

      // Send request to get pre-signed URLs from the backend
      const uploadUrlResponse = await fetch(
        `${envKey.BASE_URL}/vendor/getUploadUrl`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (!uploadUrlResponse.ok) {
        console.error(
          "Failed to get upload URL:",
          uploadUrlResponse.statusText
        );
        return false;
      }

      const uploadUrlData = await uploadUrlResponse.json();
      const preSignedUrls = uploadUrlData.data; // Array of pre-signed URLs

      // Construct the image paths in the format 'folderName/fileName'
      const imagePaths = preSignedUrls.map((document, index) => ({
        fileName: formData.imageUrl[index].name,
        uploadPath: `${folderName}/${document.fileName}`,
      }));

      // Upload files to S3 using pre-signed URLs
      const uploadPromises = preSignedUrls.map(async (document, index) => {
        const file = formData.imageUrl[index];
        const response = await fetch(document.uploadPath, {
          method: "PUT",
          body: file,

          headers: {
            "Content-Type": file.type,
          },
        });

        if (!response.ok) {
          console.error(`Failed to upload ${file.name}:`, response.statusText);
          return null;
        }

        return imagePaths[index].uploadPath; // Return the image path in 'folderName/fileName' format
      });

      const uploadedPaths = await Promise.all(uploadPromises);

      // Construct data to update the form with processed data
      const updatedFormData = {
        ...formData,
        imageUrl: imagePaths.map((imagePath) => imagePath.uploadPath),
      };

      // Update the form state with the processed data
      setFormData(updatedFormData);

      console.log("Images uploaded successfully");

      // Call fetchData here
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:3001/vendor/verify-token",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        // Handle unauthorized access or invalid token
        // Redirect to login page or display a message
        return false;
      }
      const { vendorId } = await response.json();
      console.log("Fetching", vendorId);

      try {
        // const { product } = formData;
        // console.log(formData)
        const response = await fetch(`${envKey.BASE_URL}/vendor/${vendorId}/categories`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFormData),
        });
  
        if (response.ok) {
          console.log("Category added successfully");
          // Optionally, perform any additional actions after successful category addition
        } else {
          console.error("Failed to add category:", response.statusText);
          // Handle error
        }
      } catch (error) {
        console.error("Error adding category:", error);
        // Handle error
      }
      return true; // Return true indicating successful upload
    } catch (error) {
      console.error("Error handling submit:", error);
      return false; // Return false indicating upload failure
    }
  };

  



  const handleSubmit = async (e) => {
    e.preventDefault();
   
    uploadImages();
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     // Upload images to AWS S3
  //     const uploadedImageUrls = await Promise.all(
  //       formData.imageUrl.map(async (imageFile) => {
  //         const params = {
  //           Bucket: 'YOUR_BUCKET_NAME',
  //           Key: `images/${imageFile.name}`,
  //           Body: imageFile,
  //           ACL: 'public-read',
  //         };

  //         const uploadResult = await s3.upload(params).promise();
  //         return uploadResult.Location;
  //       })
  //     );

  //     // Update form data with AWS image URLs
  //     const updatedFormData = {
  //       ...formData,
  //       imageUrl: uploadedImageUrls,
  //     };

  //     // Call saveProduct function with updated form data
  //     const savedProduct = await dataService.saveProduct(updatedFormData);
  //     console.log("Product saved successfully:", savedProduct);
  //     // Optionally, perform any additional actions after successful product save
  //   } catch (error) {
  //     console.error("Failed to save product:", error);
  //     // Handle error
  //   }
  // };
  console.log(formData);
  return (
    <CContainer>
      <h3>Add New Category</h3>
      <CForm onSubmit={handleSubmit}>
        <CRow>
          <CCol md="6">
            <CFormLabel htmlFor="keyWords" className="mt-4">
              Category Name
            </CFormLabel>
            <CFormInput
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
          </CCol>

          <CCol md="12">
            <CFormLabel htmlFor="imageUrl" className="mt-4">
              Category Images
            </CFormLabel>

            {renderImagePreviews()}
            <CFormInput
              type="file"
              id="imageUrl"
              multiple
              name="imageUrl"
              // value={formData.imageUrl}
              onChange={handleImageChange}
              accept="image/*"
            />
          </CCol>

          {/* Add other form fields similarly */}
        </CRow>

        <CButton color="primary" type="submit" className="mt-4 mb-4">
          Add Category
        </CButton>
      </CForm>
    </CContainer>
  );
};

export default AddNewCategory;
