import React, { useState, useEffect } from "react";
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
import { dataService } from "../../services/apiServices/dataService";
// import AWS from "aws-sdk";
import PropTypes from "prop-types"; // Import PropTypes
import { useParams } from "react-router-dom";

const EditProduct = () => {
  const [formData, setFormData] = useState({
    // Initial state with empty values
    productName: "",
    description: "",
    keyWords: "",
    sku: "",
    price: "",
    category: "",
    brand: "",
    imageUrl: [],
    quantity: "",
    minQuantityWarning: "",
    size: "",
    discountCouponCode: [],
    countryOfOrigin: "",
    allowGiftOption: false,
    review: [],
    care: "",
    delivery: "",
    details: "",
    totalQuantitySold: "",
    canReturnRefund: false,
    relatedProducts: [],
    upSellProducts: [],
    crossSellProducts: [],
    visible: true,
    liveFrom: "",
    liveTill: "",
  });
  const productId = useParams();
  console.log(productId.id);
  useEffect(() => {
    // Fetch product details when component mounts
    const fetchProductDetails = async () => {
      try {
        const product = dataService.getProductById(productId.id).then((product) => {
          console.log(product);
          setFormData(product); // Populate state with fetched product details
        });
        // console.log(product);
        // setFormData(product); // Populate state with fetched product details
      } catch (error) {
        console.error("Failed to fetch product details:", error);
        // Handle error
      }
    };
    fetchProductDetails();
  }, [productId]);

  console.log(formData);
  // Function to render image previews
  const renderImagePreviews = () => {
    if (formData.imageUrl) {
      return (
        <CContainer>
          <CRow>
            {formData.imageUrl.map((preview, index) => (
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

    // Read each image file and create a preview URL
    const newImagePreviews = imagesArray.map((image) =>
      URL.createObjectURL(image)
    );

    // Update the form state with the new image previews along with preserving existing ones
    setFormData((prevData) => ({
      ...prevData,
      imageUrl: [...(prevData.imageUrl || []), ...newImagePreviews],
    }));
  };

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
  console.log(formData);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const updatedProduct = await updateProduct(productId, formData);
  //     console.log("Product updated successfully:", updatedProduct);
  //     // Optionally, perform any additional actions after successful product update
  //   } catch (error) {
  //     console.error("Failed to update product:", error);
  //     // Handle error
  //   }
  // };

  return (
    <CContainer>
      <h3>Update Product</h3>
      <CForm
      //  onSubmit={handleSubmit}
      >
        <CRow>
          <CCol md="6">
            <CFormLabel htmlFor="productName" className="mt-4">
              Product Name
            </CFormLabel>
            <CFormInput
              type="text"
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              required
            />
          </CCol>
          <CCol md="6">
            <CFormLabel htmlFor="keyWords" className="mt-4">
              Keywords
            </CFormLabel>
            <CFormInput
              type="text"
              id="keyWords"
              name="keyWords"
              value={formData.keyWords}
              onChange={handleChange}
            />
          </CCol>
          <CCol md="12">
            <CFormLabel htmlFor="description" className="mt-4">
              Product Description
            </CFormLabel>
            <CFormTextarea
              id="description"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </CCol>

          <CCol md="6">
            <CFormLabel htmlFor="sku" className="mt-4">
              SKU
            </CFormLabel>
            <CFormInput
              type="text"
              id="sku"
              name="sku"
              value={formData.sku}
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
              value={formData.price}
              onChange={handleChange}
              required
            />
          </CCol>
          <CCol md="6">
            <CFormLabel htmlFor="category" className="mt-4">
              Category
            </CFormLabel>
            <CFormInput
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
          </CCol>
          <CCol md="6">
            <CFormLabel htmlFor="brand" className="mt-4">
              Brand
            </CFormLabel>
            <CFormInput
              type="text"
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
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
          <CCol md="6">
            <CFormLabel htmlFor="brand" className="mt-4">
              Care
            </CFormLabel>
            <CFormTextarea
              type="text"
              id="care"
              rows={2}
              name="care"
              value={formData.care}
              onChange={handleChange}
            />
          </CCol>
          <CCol md="6">
            <CFormLabel htmlFor="brand" className="mt-4">
              Delivery
            </CFormLabel>
            <CFormTextarea
              type="text"
              id="delivery"
              rows={2}
              name="delivery"
              value={formData.delivery}
              onChange={handleChange}
            />
          </CCol>
          <CCol md="6">
            <CFormLabel htmlFor="brand" className="mt-4">
              Details
            </CFormLabel>
            <CFormTextarea
              type="text"
              id="details"
              rows={2}
              name="details"
              value={formData.details}
              onChange={handleChange}
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol md="6">
            <CFormLabel htmlFor="quantity" className="mt-4">
              Quantity
            </CFormLabel>
            <CFormInput
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
            />
          </CCol>

          <CCol md="6">
            <CFormLabel htmlFor="size" className="mt-4">
              Size
            </CFormLabel>
            <CFormInput
              type="text"
              id="size"
              name="size"
              value={formData.size}
              onChange={handleChange}
            />
          </CCol>
          {/* Add other form fields similarly */}
        </CRow>
        <CRow>
          <CCol md="6">
            <CFormLabel htmlFor="countryOfOrigin" className="mt-4">
              Country of Origin
            </CFormLabel>
            <CFormInput
              type="text"
              id="countryOfOrigin"
              name="countryOfOrigin"
              value={formData.countryOfOrigin}
              onChange={handleChange}
            />
          </CCol>
          <CCol md="3">
            <CFormLabel className="mt-4">Allow Gift Option</CFormLabel>
            <CFormCheck
              id="allowGiftOption"
              label={formData.allowGiftOption ? "Yes" : "No"}
              name="allowGiftOption"
              checked={formData.allowGiftOption}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  allowGiftOption: e.target.checked,
                }))
              }
            />
          </CCol>
          <CCol md="3">
            <CFormLabel className="mt-4">Can Return/Refund</CFormLabel>
            <CFormCheck
              id="canReturnRefund"
              label={formData.canReturnRefund ? "Yes" : "No"}
              name="canReturnRefund"
              checked={formData.canReturnRefund}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  canReturnRefund: e.target.checked,
                }))
              }
            />
          </CCol>
          <CCol md="12">
            <CFormLabel htmlFor="discountCouponCode" className="mt-4">
              Discount Coupons
            </CFormLabel>
            {/* {formData.discountCouponCode[0].map((coupon, index) => (
              <div key={index}>
                <CRow>
                  <CCol md="4">
                    <CFormLabel htmlFor={`couponName${index}`} className="mt-2">
                      Coupon Name
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      id={`couponName${index}`}
                      name={`couponName${index}`}
                      value={formData.discountCouponCode.couponName}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </CCol>
                  <CCol md="4">
                    <CFormLabel
                      htmlFor={`discountInPercent${index}`}
                      className="mt-2"
                    >
                      Discount in Percent
                    </CFormLabel>
                    <CFormInput
                      type="number"
                      id={`discountInPercent${index}`}
                      name={`discountInPercent${index}`}
                      value={formData.discountCouponCode.discountInPercent}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </CCol>
                  <CCol md="4">
                    <CFormLabel
                      htmlFor={`discountInAmount${index}`}
                      className="mt-2"
                    >
                      Discount in Amount
                    </CFormLabel>
                    <CFormInput
                      type="number"
                      id={`discountInAmount${index}`}
                      name={`discountInAmount${index}`}
                      value={formData.discountCouponCode.discountInAmount}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </CCol>
                  <CCol md="4">
                    <CFormLabel htmlFor={`couponName${index}`} className="mt-2">
                      Discount Type
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      id={`couponName${index}`}
                      name={`couponName${index}`}
                      value={formData.discountCouponCode.couponName}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </CCol>
                  <CCol md="4">
                    <CFormLabel htmlFor={`couponName${index}`} className="mt-2">
                      Valid From Date
                    </CFormLabel>
                    <CFormInput
                      type="date"
                      id={`couponName${index}`}
                      name={`couponName${index}`}
                      value={formData.discountCouponCode.couponName}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </CCol>
                  <CCol md="4">
                    <CFormLabel htmlFor={`couponName${index}`} className="mt-2">
                      ExpireDate
                    </CFormLabel>
                    <CFormInput
                      type="date"
                      id={`couponName${index}`}
                      name={`couponName${index}`}
                      value={formData.discountCouponCode.couponName}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </CCol>
                </CRow>

              </div>
            ))} */}
          </CCol>
          <CCol md="6">
            <CFormLabel htmlFor="liveFrom" className="mt-2">
              Live From
            </CFormLabel>
            <CFormInput
              type="date"
              id="liveFrom"
              name={"liveFrom"}
              value={formData.liveFrom}
              onChange={(e) => handleChange(e)}
            />
          </CCol>
          <CCol md="6">
            <CFormLabel htmlFor="liveTill" className="mt-2">
              Live Till
            </CFormLabel>
            <CFormInput
              type="date"
              id="liveTill"
              name={"liveTill"}
              value={formData.liveTill}
              onChange={(e) => handleChange(e)}
            />
          </CCol>

          {/* Add other form fields similarly */}
        </CRow>
        <CButton color="primary" type="submit" className="mt-4 mb-4">
          Update Product
        </CButton>
      </CForm>
    </CContainer>
  );
};

export default EditProduct;
