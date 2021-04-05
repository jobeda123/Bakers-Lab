import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import './AddProduct.css';
import axios from 'axios';
import { UserContext } from '../../App';

const AddProduct = () => {
    const [loggedInUser, setLoggedInUser, adminAddAction, setAdminAddAction] = useContext(UserContext);
    const { register, handleSubmit, watch, errors } = useForm();
    const [imageURL, setImageURL] = useState(null);
    const [uploadTime, setUploadTime] = useState(null);

    const onSubmit = data => {
        //console.log("Data-----",data);
        const eventData = {
            userEmail: loggedInUser.email,
            name: data.productName,
            price: data.price,
            imageURL: imageURL,
            uploadTime: uploadTime
        }
        const url = `https://shielded-wildwood-39102.herokuapp.com/addProduct`;
        console.log(eventData);
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(eventData)
        })
            .then(res => {
                console.log("server side response........", res);
            })
        
        document.getElementById('inputField1').value = '';
        document.getElementById('inputField2').value = '';
    };

    const handleImageUpload = event => {
        console.log("image uploading..........", event.target.files);
        setUploadTime(event.target.files[0].lastModifiedDate);
        const imageData = new FormData();
        imageData.set('key', '651cd2d556176d579184fce70268ab3a');
        imageData.append('image', event.target.files[0]);


        axios.post('https://api.imgbb.com/1/upload',
            imageData)
            .then(function (response) {
                console.log(response);
                setImageURL(response.data.data.display_url);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className="addProductArea">
            <h1 id="addProductTitle">Add Product</h1>
            <form className="formArea section" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="">Product Name</label>
                    <br />
                    <input id="inputField1" name="productName" placeholder="Product Name" type="text" ref={register} required/>
                </div>
                <br />
                <div>
                    <label htmlFor="">Price</label>
                    <br />
                    <input id="inputField2"  name="price" placeholder="Price" type="text" ref={register} required/>
                </div>
                <br />
                <div>
                    <label htmlFor="">Add Photo</label>
                    <br />
                    <label class="custom-file-upload">
                        <input onChange={handleImageUpload} type="file" />Upload Photo
                    </label>
                </div>
                <br />
                
                <input type="submit" />
            </form>

        </div>

    );

};

export default AddProduct;