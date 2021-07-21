import AppHeader from "../../components/app-header/app-header";
import PersonalAreaMenu from "../../components/personal-area/personal-area-menu";
import PersonalAreaForm from "../../components/personal-area/personal-area-form"
import styles from "./profile.module.css"

export const ProfilePage = () => (
  <>
    <AppHeader />
    <div className={styles.container}>
      <PersonalAreaMenu
        description="изменить свои персональные данные"
      />
      <div>
        <PersonalAreaForm />
      </div>
    </div>
  </>
);
