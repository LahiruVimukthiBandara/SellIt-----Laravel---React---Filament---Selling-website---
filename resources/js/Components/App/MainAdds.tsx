import { useEffect, useState } from "react";
import axios from "axios";

interface Cad {
    id: number;
    company: string;
    image_path: string;
    active: number;
}

export default function MainAdds() {
    const [ads, setAds] = useState<Cad[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const imageUrl = "http://127.0.0.1:8000/storage/";

    useEffect(() => {
        const fetchAds = async () => {
            try {
                const res = await axios.get("/customerAds");
                setAds(res.data.data || res.data);
            } catch (err) {
                console.error("Cannot fetch customer ads", err);
            }
        };
        fetchAds();
    }, []);

    useEffect(() => {
        if (ads.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === ads.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);

        return () => clearInterval(interval);
    }, [ads]);

    if (ads.length === 0) {
        return (
            <div className="w-full h-auto">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/9/93/Long_sky_background_%2B_PAN.jpg"
                    alt="No Ads Available"
                    className="w-screen h-32 object-cover rounded shadow"
                />
            </div>
        );
    }

    const currentAd = ads[currentIndex];

    return (
        <div className="w-full h-auto transition duration-500 ease-in-out">
            <img
                key={currentAd.id}
                src={`${imageUrl}${currentAd.image_path}`}
                alt={currentAd.company}
                className="w-screen h-32 object-cover rounded shadow"
            />
        </div>
    );
}
