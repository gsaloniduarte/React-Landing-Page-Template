import { useState, useEffect } from "react";
import { Image } from "./image";
import React from "react";
import SearchIcon from '@mui/icons-material/Search';

export const Generate = (props) => {
  // State to track the selected category filter
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cart, setCart] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [cartVisible, setCartVisible] = useState(false); // State to track cart visibility
  
  // State to track selected gender
  const [selectedGender, setSelectedGender] = useState("Mulher");

  // Function to handle gender selection
  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    setCart([])
  };

  const toggleCartVisibility = () => {
    setCartVisible((prevState) => !prevState); // Toggle cart visibility
  };
  // Check if props.data is available
  useEffect(() => {
    if (props.data && props.data.Models && props.data.filters) {
      setIsLoading(false);
    }
  }, [props.data]);

  // Function to handle filter selection
  const handleFilter = (category) => {
    setSelectedCategory(category);
  };

  // Filter the models based on the selected category

    const filteredModels = selectedCategory
    ? (selectedGender === "Homem"
        ? props.data.ModelsHomem
        : props.data.Models
      ).filter((model) => model.category === selectedCategory)
    : selectedGender === "Homem"
    ? props.data.ModelsHomem
    : props.data.Models;
  


  // Function to add item to cart
  const addToCart = (image) => {
    setCart((prevCart) => [...prevCart, image]);
    setCartVisible(true);
  };

  // Function to handle image upload
  const handleImageUpload = (event) => {
    setUploadedImage(URL.createObjectURL(event.target.files[0]));
  };

  // Remove an item from the cart
  const removeFromCart = (indexToRemove) => {
    setCart((prevCart) => prevCart.filter((_, index) => index !== indexToRemove));
  };

  if (isLoading) {
    return <p>Loading...</p>; // Exibir uma mensagem de carregamento enquanto os dados não estão prontos
  }

  return (
    <div id="portfolio" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Gere suas fotos</h2>
          <p>Escolha fotos para gerar com o seu rosto.</p>
          <div className="gender-toggle">
            <button
              onClick={() => handleGenderSelect("Homem")}
              className={`gender-button ${selectedGender === "Homem" ? "active" : ""}`}
            >
              Homem
            </button>
            <button
              onClick={() => handleGenderSelect("Mulher")}
              className={`gender-button ${selectedGender === "Mulher" ? "active" : ""}`}
            >
              Mulher
            </button>
          </div>
        </div>

        {/* Filters List */}
        <div className="filters-bar">
          {props.data.filters.map((filter, index) => (
            <button
              key={index}
              onClick={() => handleFilter(filter.category)}
              className={`filter-button ${selectedCategory === filter.category ? "active" : ""}`}
            >
              {selectedGender === "Mulher" ?  <img src={filter.thumbnail} alt={filter.name} />: <img src={filter.thumbnailHomem} alt={filter.name} />

              }
              
              <span>{filter.name}</span>
            </button>
          ))}
        </div>


        {/* Display filtered images */}
        <div className="row">
          <div className="portfolio-items">
            {filteredModels.length > 0 ? (
              filteredModels.map((d, i) => (
                <>
                <button key={`${d.title}-${i}`} className="col-sm-6 col-md-2 col-lg-2 h-full "  onClick={() => addToCart(d)}>
 
                  <Image
                    title={"Selecionar"}
                    smallImage={d.smallImage}
                  />
                </button>

                </>
                
              ))
            ) : (
              <p>Sem imagens disponíveis</p>
            )}
          </div>
        </div>




        <div>
      {/* Toggle Cart Button */}
      <button className={`toggle-cart-button ${cartVisible ? "open" : ""}`} onClick={toggleCartVisibility}>
        {cartVisible ? "⮟" : "⮝"} {/* Show + when closed, − when open */}
      </button>

      {/* Shopping Cart */}
      <div className={`shopping-cart ${cartVisible ? "open" : ""}`}>
        <h3>{`Fotos selecionadas de gênero: ${selectedGender === "Homem" ? "Homem" : "Mulher"}`} </h3>
        <div className="cart-items">
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <div key={index} className="cart-item">
                <button className="remove-button" onClick={() => removeFromCart(index)}>
                  &times;
                </button>
                <button>
                  <Image title={item.title} smallImage={item.smallImage} />
                </button>
              </div>
            ))
          ) : (
            <p>Selecione algum modelo</p>
          )}
        </div>

        {/* Image Upload */}
        <div className="image-upload">
          <h4>Carregue a sua foto seguindo fotos de exemplo.</h4>
          <input type="file" onChange={handleImageUpload} />
          {uploadedImage && (
            <div>
              <p>Carregue sua foto aqui:</p>
              <img
                src={uploadedImage}
                alt="Uploaded preview"
                style={{ maxWidth: "100px", marginTop: "10px" }}
              />
            </div>
          )}
        </div>
      </div>
    </div>





      {/* Shopping Cart */}
      <div className="shopping-cart">
        {/* <h3>Selected Images</h3> */}
        {/* <div className="cart-items">
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <div key={index} className="cart-item">
                <button className="remove-button" onClick={() => removeFromCart(index)}>
                  &times;
                </button>
                <button >
                  <Image title={item.title}   smallImage={item.smallImage} />
                </button>

              </div>
            ))
          ) : (
            <p>No images selected</p>
          )}
        </div> */}

          {/* Image Upload */}
          {/* <div className="image-upload">
            <h4>Upload your image</h4>
            <input type="file" onChange={handleImageUpload} />
            {uploadedImage && (
              <div>
                <p>Uploaded Image Preview:</p>
                <img src={uploadedImage} alt="Uploaded preview" style={{ maxWidth: "100px", marginTop: "10px" }} />
              </div>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};
