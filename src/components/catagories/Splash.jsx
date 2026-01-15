import { useOutletContext } from "react-router";

function Splash() {
    const { splashText } = useOutletContext();

    return (
        <div className="splash-layout">
            <div className="splash-item">
                <h3>{splashText.title}</h3>
                <p>{splashText.desc}</p>
            </div>
            <p className="splash-item">{splashText.detail}</p>
        </div>
    );
}

export default Splash;
