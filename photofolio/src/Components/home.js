import {useState,useEffect} from "react";


export default function Photo(){

    const [currentAlbum, setCurrentAlbum] = useState({images: []});

    const [showDiv, setShowDiv] = useState(false);
    const [showButton,setShowButton] = useState(true);
    const [aName, setAName] = useState();
    const [albums, setAlbums] = useState([]);
    const [showImage, setShowImage] = useState(true);
    const [showImDiv, setShowImDiv] = useState(false);
    const [iName,setIName] = useState();
    const [uName, setUName] = useState();

    useEffect(() => {
        console.log("useEffect triggered"); // Debug log
        fetch("http://localhost:3002/api/albums/all")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch albums: ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("Fetched Albums from API:", data); // Ensure data is correct
                setAlbums(data); // Update albums state with data from MongoDB
            })
            .catch((error) => {
                console.error("Error fetching albums:", error);
            });
       }, []);
    
    

    function viewAlbum(album) {
        fetch(`http://localhost:3002/api/images/${album._id}`)
            .then((response) => response.json())
            .then((images) => {
                setCurrentAlbum({ ...album, images }); // Update the album with fetched images
            })
            .catch((error) => {
                console.error("Error fetching images for album:", error);
                alert("Failed to load images for the selected album.");
            });
    }
    

    function goBack(){
        setCurrentAlbum(null);
    }

    function handleAddAlbum(){
        setShowButton(false);
        setShowDiv(true);
    }

    function oFF(){
        setShowDiv(false);
        setShowButton(true);
    }

    function createAlbum(){
        const options = {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: aName })
        }

        if (aName?.trim()){
            fetch("http://localhost:3002/api/albums/add",options).then(function(response){
                if (response.ok)
                {
                    return response.json();
                }
                else{
                    return response.json().then(function (errorData) {
                        throw new Error(errorData.error || "Unexpected error.");
                    });
                }
            }).then(function(result){
                setAlbums([...albums, result]); // Add the new album to the local state
                setAName(""); // Reset the input field
                setShowDiv(false); // Close the create album form
                setShowButton(true); // Show the "Add Album" button
                alert(`Album "${result.name}" added successfully!`);
            }).catch(function(error){
                console.error("Error while adding album:", error);
                alert(error.message || "An unexpected error occurred. Please try again.");

            });
        }else{
            alert("Album name cannot be empty!");
        }
    }

    function reset(){
        setAName("");
    }

    function handleAddImage(){
        setShowImage(false);
        setShowImDiv(true);
    }

    function rej(){
        setShowImage(true);
        setShowImDiv(false);
    }

    function createImage() {
        if (iName?.trim() && uName?.trim() && currentAlbum) {
            const imageData = {
                title: iName,
                url: uName,
                albumId: currentAlbum._id // Use the album's unique identifier
            };
    
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(imageData),
            };
    
            fetch("http://localhost:3002/api/images/add", options)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        return response.json().then((errorData) => {
                            throw new Error(errorData.error || "Unexpected error.");
                        });
                    }
                })
                .then((result) => {
                    const updatedAlbums = albums.map((album) =>
                        album._id === currentAlbum._id
                            ? { ...album, imageRefs: [...album.imageRefs, result._id] }
                            : album
                    );
                    setAlbums(updatedAlbums); // Update the state with the new image
                    setCurrentAlbum({
                        ...currentAlbum,
                        imageRefs: [...currentAlbum.imageRefs, result._id],
                    });
    
                    // Reset inputs
                    setIName("");
                    setUName("");
                    setShowImDiv(false);
                    setShowImage(true);
                    alert("Image added successfully!");
                })
                .catch((error) => {
                    console.error("Error adding image:", error);
                    alert(error.message || "An unexpected error occurred.");
                });
        } else {
            alert("Both Title and URL are required!");
        }
    }
    

    function reset2(){
        setIName(""); // Clear the title input
        setUName(""); // Clear the URL input

    }


    return(
        <div className="SPA">

            <div className="hh">
            <span className>
            <img src="/pp2.png" alt="Example" />
            <h3> PhotoFolio</h3>
            </span>
            </div>

            {currentAlbum === null ? (
                <div>
                    {showDiv && (
                <div className="create">
                    <div>
                    <h2> Create an Album</h2>
                    <input type="text" placeholder="Album Name" 
                    value = {aName} onChange={(e) => setAName(e.target.value)}/>
                         </div>
                    <button type="button" className="cl" onClick={reset}> Clear</button>
                    <button type="button" className="cr" onClick={createAlbum}> Create </button>
                   
                </div>
            )}

            <div className="mid">
                <h1>Your Albums</h1>
                {showButton ? (<button type="button" className="addBut" onClick={handleAddAlbum}> 
                    Add Album</button>) : (  <button type="button" className="can" onClick={oFF}>
                         Cancel </button>)}
                
              
            </div>

            <div className="main">
            <Albumer albums={albums} setCurrentAlbum={viewAlbum}  />

            </div>

                    </div>
            ) : (
                <div>
                    {/* Detailed View */}
                    
                    <div className="mid2">
                    <div className="tog">
                    <button onClick={goBack} className="backButton">
                            <img src="back.png" alt="backing" /> 
                               </button>
                    <h1>Images in {currentAlbum.name} </h1>
                        </div>
                        {showImage ? (<button className="addIm" type="button" onClick={handleAddImage}>
                            Add Image
                        </button> ) : (<button className="reject" type="button" onClick={rej}>
                            Cancel
                        </button>)}
                        
                        </div>

                        {/* Images Array Dangerous Stuff */}

                        <div className="main">
                        {currentAlbum && currentAlbum.images && currentAlbum.images.length > 0 ? (
        currentAlbum.images.map((image, index) => (
            <div key={index} className="image-item">
                <img src={image.url} alt={image.title} className="album-image" />
                <h2>{image.title}</h2>
            </div>
        ))
    ) : (
        <p>No images in this album.</p>
    )}
                            </div>
                        

                        {showImDiv && (
                        <div className="create2">
                    
                        <h2> Add Image to {currentAlbum.name} </h2>
                        <input type="text" placeholder="Title" 
                        value = {iName} onChange={(e) => setIName(e.target.value)}/>
                        <input type="text" placeholder="Image Url" 
                        value = {uName} onChange={(e) => setUName(e.target.value)}/>
                            <div>
                            <button type="button" className="cl2" onClick={reset2}> Clear</button>
                            <button type="button" className="cr2" onClick={createImage}> Create </button>
                                </div>
                        
                    </div>

                    )}
                    
                    </div>
            )}
    </div>

   
    )

}

 function Albumer({albums, setCurrentAlbum}){
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return(
        <>
            {albums.map((album, index) => (
                <button type="button" className="single" key={index}
                onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => setCurrentAlbum(album)}>
                    <div className="front">
                        <img src="/front.png" alt="Fronter" />
                    </div>
                    <h2 id="condo" className={hoveredIndex === index ? 'hovered' : ''}>{album.name}</h2>
                </button>
            ))}

        </>
    )

 }