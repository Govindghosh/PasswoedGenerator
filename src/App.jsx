import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numAllow, setNumAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numAllow) str += "0123456789";
    if (charAllow) str += "!@#$%^&*()-_+={}[]|\\:;<>,?";
    for (let i = 1; i <= length; i++) {
      let Chara = Math.floor(Math.random() * str.length);
      pass += str.charAt(Chara);
    }
    setPassword(pass);
  }, [length, numAllow, charAllow]);

  useEffect(() => {
    passwordGenerator(); // Call the function to generate the password
   
  }, [length, numAllow, charAllow, passwordGenerator]);
  //useRef hook
  const passwordRef = useRef(null);
  const copyHandling = () =>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-400 bg-gray-600">
        <h2 className="text-white text-center my-3">Password Generator</h2>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            placeholder="Password"
            className="outline-none w-full py-1 px-3"
            readOnly
            ref={passwordRef}
          />
          <button className="bg-blue-700  text-white outline-none px-3 py-0.5 shrink-0"
          onClick={copyHandling}>
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2  text-neutral-950 font-semibold">
          <div className="flex items-center gap-x-1 text ">
            <input
              type="range"
              name=""
              id=""
              min={8}
              max={15}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={numAllow}
              onChange={() => {
                setNumAllow((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={charAllow}
              onChange={() => {
                setCharAllow((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">Special character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
