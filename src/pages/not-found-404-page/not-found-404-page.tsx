import AppHeader from "../../components/app-header/app-header";
import { Link } from "react-router-dom";

export const NotFoundPage = () => (
  <>
    <AppHeader />
    <div
      style={{
        margin: "0 auto",
        maxWidth: "600px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2>Ой! Ошибка 404</h2>
      <p>
        Страница не существует. Кликните для перехода на{" "}
        <Link to="/">
          <span style={{ color: "#4C4CFF" }}>главную страницу</span>
        </Link>
      </p>
    </div>
  </>
);
