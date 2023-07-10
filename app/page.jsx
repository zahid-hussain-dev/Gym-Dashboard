'use client'
import Image from 'next/image';
import styles from './page.module.css';
// import "@/styles/global.css";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/styledComponents/button/Button";
import { Input } from "@/components/styledComponents/input/Input";
import { InputGroup } from "@/components/styledComponents/inputGroup/InputGroup";
import PhoneNumber from "@/components/styledComponents/Countrycode";

export default function Home() {
  const router = useRouter()
  const handleClickLogin = () => {
    router.push("/Login");
  };
  return (
    <main className={styles.main}>
      <div style={{ marginTop: "20px" }}>
        {/* <div style={{padding:"50px",background:"black",overflow:"hidden"}}>hellow</div> */}
        <div className="login-card border">
          <h2 className="login-heading">Login</h2>
          <div>

            <Button
              onClick={() => {
                handleClickLogin();
                // console.log("userData....",userData)
              }}
            // disabled={user.loading}
            >
              Login
            </Button>
          </div>
        </div>
        { /* <Loader isLoading={loading}></Loader> */}

      </div>

    </main>
  )
}
