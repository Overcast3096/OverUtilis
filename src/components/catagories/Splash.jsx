import { useOutletContext } from "react-router";

function Splash() {
    const { splashText } = useOutletContext();

    return (
        <div>
            <div>
                <h3>{splashText.title}</h3>
                <p>{splashText.desc}</p>
            </div>
            <p>{splashText.detail}</p>
        </div>
    );
}

export default Splash;
