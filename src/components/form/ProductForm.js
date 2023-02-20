import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Card from '../card/Card';
import './ProductForm.scss';


const ProductForm = ({
     product,
     description,
     productImage,
     imagePreview,
      setDescription,
       handleChange,
       handleImageChange,
       handleSubmit
        }) => {
  return (
    <div className='add-product'>
      <Card cardClass={'card'}>
      <form onSubmit={handleSubmit}>
      <Card cardClass={"group"}>
            <label>Product Image:</label>
            <code className="--color-dark">
              Supported Formats: jpg, jpeg, png
            </code>
            <input
              type="file"
              // accept="image/*"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />

            {imagePreview != null ? (
              <div className="image-preview">
                <img src={imagePreview} alt="UploadImage" />
              </div>
            ) : (
              <p>No image set for this product.</p>
            )}
          </Card>

        <label htmlFor="">Product Name</label>
        <input 
        type="text" 
        placeholder='Product Name'
         name='name' 
         value={product?.name} 
         onChange={handleChange}
         />

       <label htmlFor="">Product Category</label>
       <input 
        type="text" 
        placeholder='Product Category'
         name='category' 
         value={product?.category} 
         onChange={handleChange}
         />

       <label htmlFor="">Product Price</label>
       <input 
        type="text" 
        placeholder='Product Price'
         name='price'
          value={product?.price} 
         onChange={handleChange}
         /> 

       <label htmlFor="">Product Quantity</label>
       <input 
        type="text" 
        placeholder='Product Quantity'
         name='quantity' 
         value={product?.quantity} 
         onChange={handleChange}
         />

      <label htmlFor="">Product Description</label>
      <ReactQuill 
      theme='snow'
       value={description}
        onChange={setDescription}
        modules={ProductForm.modules}
        formats={ProductForm.formats}
         />

         <div className="--my">
          <button type='submit' className="--btn --btn-primary">Create Product</button>
         </div>
      </form>
      </Card>
    </div>
  )
}

ProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
ProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];
export default ProductForm