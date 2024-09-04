import React, { useState, useEffect } from "react";
import './App.css';
import useDebounce from "./customdebounce";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const data = ["Lenin", "Bevan", "Charles", "prince", "Praveen", "Kumar", "Mani"];
  const [suggestion, setSuggestion] = useState([]);


  const handleChange = (e) => {
    setSearchInput(e.target.value);
    // debouncedFilterBySearch(e.target.value);
  }

  // useEffect(() => {
  //   if (searchInput) {
  //     debouncedFilterBySearch(searchInput);
  //   }
  // }, [searchInput]);

  // const debounce = (func, delay) => {
  //   let timerId;
  //   return function (...args) {
  //     const context = this;
  //     clearTimeout(timerId);
  //     timerId = setTimeout(() => {
  //       func.apply(context, args);
  //     }, delay);
  //   };
  // };

  // const filterData = (searchInput) =>{
  //   const suggestionData = data.filter((item)=>{
  //     if(item.toLocaleLowerCase().includes(searchInput)){
  //       return item;
  //     }
  //   })
  //   setSuggestion(suggestionData)
  // }

  const customdebounce = useDebounce(searchInput, 1000);
  useEffect(() => {
    const filterData = async () => {
      if (customdebounce) {
        try {
          const response = await fetch(`https://fakestoreapi.com/users`);
          const responseData = await response.json();
          console.log('responseData: ', responseData);
        }
        catch (error) {
          console.log("error :", error);
        }
        const filtered = data.filter((item) => {
          return item?.toLocaleLowerCase().includes(searchInput?.toLocaleLowerCase());
        })
        setSuggestion(filtered);
      }
      // else {
      //   setSuggestion([]);
      // }
    }
    filterData();
  }, [customdebounce])

  // const fetchDetails = () => {
  //   fetch('https://jsonplaceholder.typicode.com/todos/100')
  //     .then(res => res.json())
  //     .then(data => console.log(data)
  //     )
  //   console.log(suggestion);
  // }

  // const debouncedFilterBySearch = debounce(filterData, 2000);
  return (
    <div className="App">
      <header className="App-header">
        <input type="text" placeholder='Search...' onChange={handleChange} autoFocus />
        {
          suggestion.map((item, index) => {
            return (
              <div key={index} >
                {
                  searchInput ?
                    <div style={{ border: "2px solid black", height: "100px", width: "100px" }} >
                      {item}
                    </div>
                    : <></>
                }
              </div>
            )
          })
        }
      </header>
    </div>
  );
}

export default App;
