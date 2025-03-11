import React, { useCallback, useEffect, useRef, useState } from "react";

const App = () => {
  const [length, setlength] = useState(8);
  const [number, setnumber] = useState(false);
  const [charallow, setchar] = useState(false);
  const [Password, setpassword] = useState("");
 const passwordRef = useRef(null)
  const PasswordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (charallow) str += "`~!@#$%^&*()_+={}:?/<,>";

    for (let i = 1; i <=length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      console.log(char);
      
      pass += str.charAt(char);
    }
    setpassword(pass);
  }, [length, number, charallow, setpassword]);

  const copypassword= useCallback(()=>{
    passwordRef.current?.select() 
    window.navigator.clipboard.writeText(Password)
  },[Password])

  useEffect(()=>{
    PasswordGenerator()
  },[length,number,charallow,PasswordGenerator])
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md text-orange-500 rounded-lg px-4 my-8 bg-gray-700 ">
        <h1 className="text-white text-center my-4">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={Password}
            className="outline-none w-full py-1 px-3"
            placeholder="password "
            readOnly 
            ref={passwordRef}
          />
          <button onClick={copypassword}
          className="outline-none bg-blue-700 text-white px-3 py-0.4 shrink-0">
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={50}
              value={length}
              className="cursor-pointer"
              onChange={(e)=>{setlength(e.target.value)}}
            />
            <label> Length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
            defaultChecked = {number}
            id="numberInput" 
            onChange={ ()=>setnumber((prev)=>(!prev))}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
            defaultChecked = {charallow}
            id="charINput" 
            onChange={ ()=>setchar((prev)=>(!prev))}
            />
            <label htmlFor="charINput">Character</label>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default App;
