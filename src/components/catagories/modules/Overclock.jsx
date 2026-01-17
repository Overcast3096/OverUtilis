import { useMemo, useState } from "react";
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
    const displayData = useMemo(() => calcOutput(inputs), [inputs]);

    function handleInputs(e) {
        const { name, value } = e.target;
        setInputs((inputs) => ({
            ...inputs,
            [name]: value === "" ? "" : Number(value),
        }));
    }

    function calcOutput(calcInput) {
        let {
            recipeTime,
            recipeVoltage,
            inputVoltage,
            inputAmp,
            parallel,
            behave,
        } = calcInput;
        const invalidInputText =
            "Results will be displayed when all values are set.";

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
            isOverTier: false,
            mandatoryOverclock: false,
            wastedAmps: 0,
            usedParallels: 0,
            subtick: false,
            perfectSpeed: 0,
            flawedSpeed: 0,
        };

        // ----------Logic---------- //

        // Special Case - needed OC
        if (recipeVoltage > inputVoltage && inputAmp > 3) {
            outputMeta.mandatoryOverclock = true;
            outputMeta.isOverTier = true;
            recipeVoltage += 1; // causes issues
        }

        // Eats parallel & wasted amps
        outputMeta.usedParallels = inputAmp > parallel ? parallel : inputAmp;
        outputMeta.wastedAmps = Math.max(0, inputAmp - parallel);

        // Power budgets
        const convertedPower = 4 ** recipeVoltage * outputMeta.usedParallels;
        const powerBudget = 4 ** inputVoltage * inputAmp;
        // 4 ** inputVoltage + 4 ** inputVoltage * outputMeta.wastedAmps;

        // Max number of OCs
        // Log(n) / Log(base), emulates root like behaviour
        const totalOC = Math.floor(
            Math.log(powerBudget / convertedPower) / Math.log(4)
        );

        outputMeta.isOverTier =
            totalOC > recipeVoltage - inputVoltage ? true : false;

        // Final i/s
        outputMeta.flawedSpeed =
            (2 ** totalOC / recipeTime) * outputMeta.usedParallels;
        outputMeta.perfectSpeed =
            (4 ** totalOC / recipeTime) * outputMeta.usedParallels;

        console.log([convertedPower, powerBudget, "", totalOC]);
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
            <div className="overclock-item overclock-column">
                <div>{JSON.stringify(displayData)}</div>
                <div>
                    <p>
                        {() => {
                            if (displayData.mandatoryOverclock) {
                                return `This machine is overclocking beyond it's
                                    inputted voltage tier to meet the recipe's
                                    demands! Make sure your machine is capable
                                    of doing this!`;
                            }
                        }}
                    </p>
                </div>

                <div>
                    <p>
                        If the machine can Perfect OC, you would get{" "}
                        {displayData.perfectSpeed}/s recipe completions.
                    </p>
                </div>
                <div>
                    <p>
                        If it's doing Inperfect OCs, you would get{" "}
                        {displayData.flawedSpeed}/s recipe completions.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Overclock;
