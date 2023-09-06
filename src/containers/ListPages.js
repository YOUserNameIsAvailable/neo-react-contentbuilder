import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ListPages.css";

export default function ListPages({ queryPageParam }) {
    const [listPages, setListPages] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);


    useEffect(() => {
        onLoad();
    }, []);

    async function onLoad() {
        setIsLoaded(false);

        try {
            const response = await axios.get("/all");
            const data = response.data;

            if (data.success) {
                setListPages(data.pages || []);
                setIsLoaded(true);
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error("error:", error);
        }
    }

    return (
        <div className="container-box">
            {isLoaded ? (
                listPages.length > 0 ? (
                    <ul>
                        {listPages.map((page, index) => {
                            const url = `edit${page.page}`;
                            const pageValue = url.split("page=")[1];
                            return (
                                <li className="mb-1"  key={index}>
                                    <a className="hover:bg-indigo-50 p-1" href={url}>Edit {pageValue}</a>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <p className="px-5 py-3 "> You have no pages created yet</p>
                )
            ) : (
                <></>
            )}
            <div className="container"></div>
        </div>
    );
}
