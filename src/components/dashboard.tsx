import React, { useEffect, useState } from "react";
import './dashboard.css';
import Left from "./left";
import Loader from "./loader";

interface Person {
    name: string;
    detail: string;
    short: string;
}

function Dashboard(): JSX.Element {
    const [customer, setCustomer] = useState<number>(0);
    const [query, setQuery] = useState<number>(0)
    const [photos, setPhotos] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const apiKey: string = 'zLrDzk2qKeuVHLckJKnUhPs6l6pGld3eHxeJ8jgDdsNbS48pfXtNixYS';

        fetch(`https://api.pexels.com/v1/curated?per_page=9&page=${query + 1}`, {
            headers: {
                Authorization: apiKey,
            },
        })
            .then(response => response.json())
            .then(data => setPhotos(data.photos));
        setLoading(false)
    }, [query, customer]);

    useEffect(() => {
        const timeChange: NodeJS.Timeout = setInterval(() => {
            setQuery(query => query + 10)
        }, 10000);

        return () => clearInterval(timeChange);

    }, []);

    const persons: Person[] = [];
    for (let i = 0; i < 1000; i++) {
        const person: Person = {
            name: "Customer " + (i + 1),
            detail: "I am customer number " + (i + 1) +
                ' in this list and below are some of my paintings. Click the cards on the Right to see Others “What art is, in reality, is this missing link, not the links which exist. It is not what you see that is art; art is the gap.”',
            short: "I am customer number " + (i + 1) +
                ' in this list and below are some of my paintings. Click the cards on the Right to see Others...'
        }
        persons.push(person);
    }

    function handleClick(a: number) {
        setLoading(true)
        setCustomer(a);
        setQuery(a);
    }



    return (
        <>



            <div>
                <div className="container">
                    <h3 id="heading">This here is the heading</h3>
                </div>
                <div className="d-flex">
                    <div className={loading ? "left1" : "left"}>
                        <Left handleClick={handleClick} persons={persons} customer={customer} />
                    </div>
                    
                        <div className="container right">
                        {loading ? <><Loader /> </> :
                            <>
                            <h3>{persons[customer].name}</h3>
                            <p>{persons[customer].detail}</p>
                            <div>
                                <div className="grid-container">
                                    {photos.map((ele, i) => {
                                        return (
                                            <div className="grid-item"><img alt="" src={ele.src.original} /></div>
                                        )
                                    })}
                                </div>
                            </div></>}
                        </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
