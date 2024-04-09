import React, { useEffect, useState } from "react";
import {
  CButton,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CFormTextarea,
} from "@coreui/react";
// import { dataService } from "../../services/apiServices/dataService";
// import AWS from "aws-sdk";
import { envKey } from "src/Url";
import { useNavigate } from "react-router-dom";

const AddNewOrder = () => {
  const navigate = useNavigate();
  // const [vendorId, setVendorId] = useState();
  const [categories, setCategories] = useState();
  // AWS.config.update({
  //   accessKeyId: "YOUR_ACCESS_KEY_ID",
  //   secretAccessKey: "YOUR_SECRET_ACCESS_KEY",
  //   region: "YOUR_AWS_REGION",
  // });

  // const s3 = new AWS.S3();

  const [formData, setFormData] = useState({
    item_name: "",
    description: "",
    price: "",
    category: "",
    imageUrl: [],
    imagePreviews: [],
  });
  const Foldername = "Products";

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
    e.target.value = null;
  };

  // const verifyTokenAndProceedToCheckout = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       // Redirect to login page or display a message
  //       navigate("/login");
  //       return;
  //     }

  //     const response = await fetch(
  //       "http://localhost:3001/vendor/verify-token",
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       // Handle unauthorized access or invalid token
  //       // Redirect to login page or display a message
  //       return;
  //     }
  //     const { vendorId } = await response.json();
  //     // setVendorId(vendorId);
  //     console.log({ vendorId });
  //     // console.log("here")
  //     const uploadSuccessful = await uploadImages();
  //     console.log({ uploadSuccessful });
  //     if (uploadSuccessful) {
  //       fetchData(vendorId);

  //     } else {
  //       // Handle upload failure
  //       console.error("Failed to")
  //     }
  //   } catch (error) {
  //     console.error("Error verifying token and proceeding to checkout:", error);
  //   }
  // };

  // const fetchData = async (vendorId) => {
  //   console.log("Fetching", vendorId);

  //   try {
  //     // const { product } = formData;
  //     // console.log(formData)
  //     const response = await fetch(
  //       `${envKey.BASE_URL}/vendor/${vendorId}/item`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(formData),
  //       }
  //     );

  //     if (response.ok) {
  //       console.log("Product added successfully");
  //       // Optionally, perform any additional actions after successful category addition
  //     } else {
  //       console.error("Failed to add product:", response.statusText);
  //       // Handle error
  //     }
  //   } catch (error) {
  //     console.error("Error adding product:", error);
  //     // Handle error
  //   }
  // };
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
        const response = await fetch(
          `${envKey.BASE_URL}/vendor/${vendorId}/item`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedFormData),
          }
        );

        if (response.ok) {
          console.log("Product added successfully");
          // Optionally, perform any additional actions after successful category addition
        } else {
          console.error("Failed to add product:", response.statusText);
          // Handle error
        }
      } catch (error) {
        console.error("Error adding product:", error);
        // Handle error
      }
      return true; // Return true indicating successful upload
    } catch (error) {
      console.error("Error handling submit:", error);
      return false; // Return false indicating upload failure
    }
  };

  const verifyTokenAndFetchCategory = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        // Redirect to login page or display a message
        navigate("/login");
        return;
      }

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
        return;
      }
      const { vendorId } = await response.json();
      console.log({ vendorId });
      // console.log("here")
      fetchCategoryData(vendorId);
      // makePayment(userName);
    } catch (error) {
      console.error("Error verifying token and proceeding to checkout:", error);
    }
  };
  const fetchCategoryData = async (vendorId) => {
    console.log("Fetching", vendorId);
    try {
      // Fetch orders for a specific vendor (replace 'vendorId' with the actual vendor ID)
      // const vendorId = 6; // Replace 'vendorId' with the actual vendor ID

      const response = await fetch(
        `${envKey.BASE_URL}/vendor/${vendorId}/categories`
      );
      const data = await response.json();

      setCategories(data); // Update state with fetched orders data
      console.log(data); // Log the fetched orders data
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    // Assuming you want to fetch orders when the component mounts
    verifyTokenAndFetchCategory();

    // Call the fetchData function
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    uploadImages();
  };

  console.log(formData);

  return (
    <CContainer>
      <h3>Add New Product</h3>
      <div className="row">
        {categories &&
          categories.map((category) => (
            <>
              <div className="col-3" key={category.id}>
                <span>Category ID: {category.id}</span>
                <br />
                <span>Category Name: {category.category_name}</span>
              </div>
            </>
          ))}
      </div>
      <CForm onSubmit={handleSubmit}>
        <CRow>
          <CCol md="6">
            <CFormLabel htmlFor="productName" className="mt-4">
              Item Name
            </CFormLabel>
            <CFormInput
              type="text"
              id="itemname"
              name="item_name"
              value={formData.item_name}
              onChange={handleChange}
              placeholder="Product Name" 
              required
            />
          </CCol>
          <CCol md="6">
            <CFormLabel htmlFor="keyWords" className="mt-4">
              Category Id
            </CFormLabel>
            <CFormInput
              type="number"
              id="category"
              name="category"
              placeholder="Enter Category Id by selecting it from the above list"
              value={formData.category}
              onChange={handleChange}
            />
          </CCol>
          <CCol md="12">
            <CFormLabel htmlFor="description" className="mt-4">
              Item Description
            </CFormLabel>
            <CFormTextarea
              id="description"
              rows={3}
              name="description"
              placeholder="Product Description"
              value={formData.description}
              onChange={handleChange}
            />
          </CCol>
          <CCol md="6">
            <CFormLabel htmlFor="price" className="mt-4">
              Price
            </CFormLabel>
            <CFormInput
              type="number"
              id="price"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </CCol>

          <CCol md="12">
            <CFormLabel htmlFor="imageUrl" className="mt-4">
              Product Images
            </CFormLabel>

            {renderImagePreviews()}
            <CFormInput
              type="file"
              id="imageUrl"
              multiple
              name="imageUrl"
              onChange={handleImageChange}
              accept="image/*"
            />
          </CCol>

          {/* Add other form fields similarly */}
        </CRow>

        <CButton color="primary" type="submit" className="mt-4 mb-4">
          Add Product
        </CButton>
      </CForm>
    </CContainer>
  );
};

export default AddNewOrder;
