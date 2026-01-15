import { useState } from "react";
import "../../../styles/overclock.css";

function Overclock() {
    const [inputs, setInputs] = useState({
        recipeTime: "",
        recipeVoltage: "",
        inputVoltage: "",
        inputAmp: "",
        parallel: "",
        behave: "",
    });
    const output = "placeholder output";
    const invalidInputText =
        "Results will be displayed when all values are set.";

    function handleInputs(e) {
        const { name, value } = e.target;
        setInputs((inputs) => ({
            ...inputs,
            [name]: value === "" ? "" : Number(value),
        }));
    }

    function calcOutput(calcInput) {
        const {
            recipeTime,
            recipeVoltage,
            inputVoltage,
            inputAmp,
            parallel,
            behave,
        } = calcInput;

        const errorData =
            recipeTime === "" ||
            recipeVoltage === "" ||
            inputVoltage === "" ||
            inputAmp === "" ||
            parallel === "" ||
            behave === "";
        if (errorData) return invalidInputText;
        if (recipeVoltage > inputVoltage && inputAmp < 4)
            return invalidInputText;

        const outputMeta = {
            mandatoryOverclock: false,
            wastedAmps: 0,
            usedParallels: 0,
            subtick: false,
            perOutput: 1,
            perfectSpeed: 0,
            flawedSpeed: 0,
        };

        // definitely good code here :tm:

        if (recipeVoltage > inputVoltage && inputAmp > 3) {
            outputMeta.mandatoryOverclock = true;
            outputMeta.usedParallels = inputAmp % 4;
            // return with no mod speed, no oc, just input speed and used parallel
        }

        if (inputAmp > parallel) {
            outputMeta.perOutput = parallel;
            outputMeta.usedParallels = parallel;
            outputMeta.wastedAmps = inputAmp - parallel;
        }

        if (parallel === inputAmp) {
            outputMeta.perOutput = parallel;
            outputMeta.usedParallels = parallel;
            // further complicated thingy when mebf/other input unlimited a is on
        }

        // let a = outputMeta.usedParallels * (recipeVoltage * 4); // gives baseline after calc lv
        // let b = (inputAmp * inputVoltage) + outputMeta.wastedAmps; // gives total power working with lv
        // let c = a % b; // how much does it go into
        const overallSpeed =
            (outputMeta.usedParallels * (recipeVoltage * 4)) %
            (inputAmp * inputVoltage);
        outputMeta.perfectSpeed = overallSpeed * 4;
        outputMeta.flawedSpeed = overallSpeed * 2;

        // ips = outputMeta.perOutput / recipeTime;
        outputMeta.perfectSpeed =
            (outputMeta.perOutput / recipeTime) * (4 * outputMeta.perfectSpeed);
        outputMeta.flawedSpeed =
            (outputMeta.perOutput / recipeTime) * (2 * outputMeta.flawedSpeed);

        return outputMeta;
    }

    return (
        <div className="overclock-layout">
            <div className="overclock-item overclock-column">
                <h3>Overclocks</h3>
                <p>
                    Calculate how fast a recipe is and the rate at which it's
                    crafted, given some params.
                </p>
            </div>
            <div className="overclock-item overclock-input">
                <div>
                    <em>Recipe Time</em>
                    <input
                        type="number"
                        name="recipeTime"
                        placeholder=">0.05"
                        min="0.05"
                        value={inputs.recipeTime}
                        onChange={handleInputs}
                    />
                </div>
                <div>
                    <em>Recipe Voltage</em>
                    <input
                        type="number"
                        name="recipeVoltage"
                        placeholder="1-15"
                        min="1"
                        max="15"
                        value={inputs.recipeVoltage}
                        onChange={handleInputs}
                    />
                </div>
                <div>
                    <em>Input Voltage</em>
                    <input
                        type="number"
                        name="inputVoltage"
                        placeholder="1-15"
                        min="1"
                        max="15"
                        value={inputs.inputVoltage}
                        onChange={handleInputs}
                    />
                </div>
                <div>
                    <em>Input Amps</em>
                    <input
                        type="number"
                        name="inputAmp"
                        placeholder=">1"
                        min="1"
                        value={inputs.inputAmp}
                        onChange={handleInputs}
                    />
                </div>
                <div>
                    <em>Parallels</em>
                    <input
                        type="number"
                        name="parallel"
                        placeholder=">1"
                        min="1"
                        value={inputs.parallel}
                        onChange={handleInputs}
                    />
                </div>
                <div className="overclock-item overclock-column">
                    <em>Behaviour</em>
                    <label>
                        <input
                            type="radio"
                            name="behave"
                            value="normal"
                            checked={inputs.behave === "normal"}
                            onChange={handleInputs}
                        />
                        Normal
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="behave"
                            value="aal"
                            checked={inputs.behave === "aal"}
                            onChange={handleInputs}
                        />
                        AAL
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="behave"
                            value="ebf"
                            checked={inputs.behave === "ebf"}
                            onChange={handleInputs}
                        />
                        EBF
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="behave"
                            value="volc"
                            checked={inputs.behave === "volc"}
                            onChange={handleInputs}
                        />
                        Volcanus
                    </label>
                </div>
            </div>
            <div className="overclock-item overclock-column">
                <h3>Details</h3>
                <p>Recipe Time - Input time in Seconds</p>
                <p>Recipe Voltage - ULV is 0, LV is 1, MV is 2... </p>
                <p>Input Voltage - Energy hatch tier of multi/singleblock</p>
                <p>Input Amps - Amps the multi is recieving</p>
                <p>Parallels - Number of parallels it can achieve</p>
                <p>
                    Toggles - Select to change the calc's math to the respective
                    multi
                </p>
            </div>
            <div className="overclock-item overclock-row">
                <div>{JSON.stringify(calcOutput(inputs))}</div>
            </div>
        </div>
    );
}

export default Overclock;
