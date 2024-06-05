import axios from "axios";
import { useEffect, useState } from "react";
import Photo from "../Photo/Photo";

function PhotodexList() {
    const [isLoading, setIsLoading] = useState(true);
    const [photos, setPhotos] = useState([]);

    async function photoDownload() {
        try {
            const response = await axios.get('https://api.slingacademy.com/v1/sample-data/photos?offset=5&limit=20');
            console.log(response.data);
            const photos = response.data.photos;
            const photoPromises = photos.map((P) => axios.get(P.url));
            const photoData = await axios.all(photoPromises);
            console.log(photoData);
            const res = photoData.map((PData) => {
                const Ph = PData.data;
                return {
                    id: Ph.id,
                    description: Ph.description,
                    title: Ph.title,
                    image: Ph.url
                };
            });
            setPhotos(res);
            setIsLoading(false);
        } catch (error) {
            console.error("Error downloading photos", error);
        }
    }

    useEffect(() => {
        photoDownload();
    }, []);

    return (
        <>
            <div>Photo's List</div>
            {isLoading ? (
                'Loading...'
            ) : (
                photos.map((P) => <Photo key={P.id} name={P.title} image={P.image} id={P.id} />)
            )}
        </>
    );
}

export default PhotodexList;
