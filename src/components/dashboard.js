import React, { useEffect, useState } from "react";
import './dashboard.css'

function Dashboard() {
    const [customer, setCustomer] = useState(0);
    const [query, setQuery] = useState(0)
    const [photos, setPhotos] = useState([]);
    useEffect(() => {
        const apiKey = 'zLrDzk2qKeuVHLckJKnUhPs6l6pGld3eHxeJ8jgDdsNbS48pfXtNixYS';

        fetch(`https://api.pexels.com/v1/curated?per_page=9&page=${query + 1}`, {
            headers: {
                Authorization: apiKey,
            },
        })
            .then(response => response.json())
            .then(data => setPhotos(data.photos));
    }, [query]);

    useEffect(() => {
        const timeChange = setInterval(() => {
            setQuery(query => query + 10)
        }, 10000);

        return () => clearInterval(timeChange);

    }, []);
    let persons = []
    for (var i = 0; i < 1000; i++) {
        let person = {
            name: "Customer " + (i + 1),
            detail: "I am customer number " + (i + 1) +
                ' in this list and below are some of my paintings. Click the cards on the Right to see Others “What art is, in reality, is this missing link, not the links which exist. It is not what you see that is art; art is the gap.”',
            short: "I am customer number " + (i + 1) +
                ' in this list and below are some of my paintings. Click the cards on the Right to see Others...'
        }
        persons.push(person)
    }
    function handleClick(a) {
        setCustomer(a)
        setQuery(a)
    }
    return (
        <>
            <div>
                <div className="container">
                    <h3 id="heading">This here is the heading</h3>
                </div>
                <div className=" d-flex">
                    <div className="left">

                        {persons.map((ele, i) => {
                            return (
                                <div className={i === customer ? "card1" : "card"} onClick={() => handleClick(i)}>
                                    <h3>{ele.name}</h3>
                                    <p>{ele.short}</p>
                                </div>
                            )
                        })}
                    </div>
                    <div className="container right">
                        <h3>{persons[customer].name}</h3>
                        <p>{persons[customer].detail}</p>
                        <div>
                            <div class="grid-container">
                                {photos.map((ele, i) => {
                                    return (
                                        <div class="grid-item"><img alt="" src={ele.src.original} /></div>
                                    )
                                })}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;