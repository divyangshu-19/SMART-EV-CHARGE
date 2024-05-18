import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Title from "./Title";
import Cta from "./Cta";
import Contract from "./Contract";
import ContractBtns from "./ContractBtns";
import Desc from "./Desc";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";

function Demo() {
  const { state } = useEth();
  const [value, setValue] = useState("?");
  const [arrayValues, setArrayValues] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const readArray = async () => {
    const values = await state.contract.methods.getValues().call({ from: state.accounts[0] });
    setArrayValues(values);
  };
  
  const pushValue = async () => {
    if (inputValue === "") {
      alert("Please enter a value to push.");
      return;
    }
    const newValue = parseInt(inputValue);
    await state.contract.methods.pushValue(newValue).send({ from: state.accounts[0] });
    setInputValue("");
    readArray(); // Refresh array values after pushing a new one
  };

  const demo =
    <>
      {/* <Cta /> */}
      <div className="contract-container">
        <Contract value={value} />
        <ContractBtns setValue={setValue} />
      </div>
      <hr />
      {/* New Section */}
      <div>
        <h3>Array Values</h3>
        <div>
          {arrayValues.join(", ")}
        </div>
        <input
          type="text"
          placeholder="Enter a value"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <button onClick={pushValue}>Push Value</button>
      </div>
      <hr />
      <button onClick={readArray}>Read Array</button>
      {/* <Desc /> */}
    </>;




  return (
    <div className="demo">
      {/* <Title /> */}
      {
        !state.artifact ? <NoticeNoArtifact /> :
          !state.contract ? <NoticeWrongNetwork /> :
            demo
      }
    </div>
  );
}

export default Demo;
