import React, { useState } from 'react';
import './Wikipedia.css';
import { BiSearch } from 'react-icons/bi';

function Wikipedia() {
    const [mode, setMode] = useState(false);
    const [successful, setSuccessful] = useState(false);
    // const [error, setError] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [results, setResults] = useState([]);

    async function getResult() {
        try {
            const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=${searchValue}`);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setResults(data.query.search);
                setSuccessful(true);
                // setError(false);
            } else {
                console.log("Page not found");
                // setError(true);
                setSuccessful(false);
            }
        } catch {
            console.log("Error fetching data");
            // setError(true);
            setSuccessful(false);
        }
    }

    return (
        <div className="Wikipedia_container">
            {!mode ? (
                <div className='search_button'>
                    <BiSearch className='fa_search' onClick={() => setMode(true)} />
                </div>
            ) : (
                <div className='wikipedia_content'>
                <h2>Wikipedia App</h2>
                    <div className="wikipedia_navbar">
                        
                        <div className="wikipedia_search">
                            <input
                                type="text"
                                placeholder="Search here..."
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                            <BiSearch className='fa' onClick={getResult} />
                        </div>
                    </div>

                    <div className={`wikipedia_search_result ${successful ? '' : 'wikipedia_search_result_notvisible'}`}>
                        {/* {error && <div className="error">Page not found or an error occurred.</div>} */}
                        {results.map((result, index) => (
                            <div key={index} className="results">
                                <h3>{result.title}</h3>
                                <p dangerouslySetInnerHTML={{ __html: result.snippet }} />
                                <a href={`https://en.wikipedia.org/wiki/${result.title}`} >Read more on Wikipedia</a>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Wikipedia;
