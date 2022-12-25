import styles from "./Main.module.css";
import Header from "../Header/Header";
import Converter from "../Converter/Converter";

const Main = () => {
    return (
        <div className={styles.page}>
            <Header />
            <Converter />
        </div>
    )
}

export default Main;