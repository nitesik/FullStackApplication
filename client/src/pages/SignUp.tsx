import styles from "@/styles/SignUp.module.css";
import Head from "next/head";
import logo from "@/Images/cog.svg";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Radio, RadioGroup } from "@mui/joy";
import { Dropdown, Menu, MenuButton, MenuItem } from "@mui/base";
import { DropdownMenu, Button, ScrollArea } from "@radix-ui/themes";
import Checkbox from "@mui/material/Checkbox";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import { Hidden } from "@mui/material";
// import { DatePicker } from "@";

interface ICountryList {
  name: {
    common: string;
  };

  flags: {
    svg: string;
  };
}

function SignUp() {
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [countryList, setCountryList] = useState<ICountryList[] | null>(null);
  const [image, setImage] = useState<string | ArrayBuffer>("");
  const [uploadReady, setUploadReady] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState<number>(0);

  const [interest, setInterest] = useState<string[]>([]);

  async function getCountryList() {
    const res = await fetch("https://restcountries.com/v3.1/all");
    const data = await res.json();
    if (res.ok) setCountryList(data);
  }

  useEffect(() => {
    getCountryList();
  }, [selectedCountry]);

  function imageHandler(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();

    try {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result!);
          setUploadReady(true);
        }
      };
      reader.readAsDataURL(event.target.files![0]!);
    } catch (e) {}
  }

  useEffect(() => {
    
  }, [image]);

  async function formHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const imageBuffer = Buffer.from(image as ArrayBuffer);
    // const binaryString = atob(image.toString().split(',')[1]);
    // const blob = new Blob([binaryString], { type: "image/png" });
    
    try {
      const res = await fetch("http://localhost:8080/create", {
        method: "POST",
        headers: { 
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          
        },
        
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          password,
          gender,
          email,
          country: selectedCountry,
          city,
          zip,
          interest: interest.length === 0 ? null : interest,
          picture: imageBuffer,
        }),        
      });

      const data = await res.json();

    } catch (error) {
      console.error("Error", error);
    }
  }

  return (
    <main className={styles.main}>
      <Head>
        <title>Sign Up</title>
      </Head>

      
      <form onSubmit={formHandler}>
        <div className={styles.header}>
          <Image src={logo} width={64} height={64} alt="logo" />
          <div className={styles.title}>Create an Account</div>
          <div className={styles.description}>
            Sign up now to get started with an account.
          </div>
        </div>
        <div className={styles.names}>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              className="input"
              id="firstName"
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              className="input"
              id="lastName"
            />
          </div>
        </div>
        <label htmlFor="lastName">Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="input"
          id="password"
        />
        <label htmlFor="lastName">Email</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="input"
          id="email"
        />
        <RadioGroup>
          <div className={styles.gender}>
            <Radio
              onChange={(e) => e.target.checked && setGender("Male")}
              required
              value="Male"
              label="Male"
              color="neutral"
            />
            <Radio
              onChange={(e) => e.target.checked && setGender("Female")}
              value="Female"
              label="Female"
              color="neutral"
            />
          </div>
        </RadioGroup>

        <div
          className={styles.countries}
          style={{ marginTop: 15, width: "50%" }}
        >
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button
                variant="soft"
                style={{
                  color: "black",
                  backgroundColor: "#c6c6c6fb",
                  cursor: "pointer",
                  height: 40,
                }}
              >
                {selectedCountry} <TriangleDownIcon />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <ScrollArea
                size="1"
                type="always"
                scrollbars="vertical"
                style={{ height: 100 }}
              >
                {/* <DropdownMenu.Item shortcut="⌘ D">Duplicate</DropdownMenu.Item> */}
                {countryList !== null &&
                  countryList
                    .sort(
                      (a, b) =>
                        a.name.common.charCodeAt(0) -
                        b.name.common.charCodeAt(0)
                    )
                    .map((country) => {
                      return (
                        <DropdownMenu.Item
                          key={country.name.common}
                          onClick={() =>
                            setSelectedCountry(country.name.common)
                          }
                          shortcut={
                            country.name.common.length > 10
                              ? country.name.common.substring(0, 10) + "..."
                              : country.name.common
                          }
                        >
                          <Image
                            src={country.flags.svg}
                            width={16}
                            height={12}
                            alt="flag"
                          />
                        </DropdownMenu.Item>
                      );
                    })}
              </ScrollArea>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          {/* <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button variant="soft">{selectedCountry}</Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <ScrollArea
                size="1"
                type="always"
                scrollbars="vertical"
                style={{ height: 100 }}
              >
                {countryList !== null &&
                  countryList
                    .sort(
                      (a, b) =>
                        a.name.common.charCodeAt(0) -
                        b.name.common.charCodeAt(0)
                    )
                    .map((country) => {
                      return (
                        <DropdownMenu.Item
                          onClick={() =>
                            setSelectedCountry(country.name.common)
                          }
                          shortcut={
                            country.name.common.length > 10
                              ? country.name.common.substring(0, 10) + "..."
                              : country.name.common
                          }
                        >
                          <Image
                            src={country.flags.svg}
                            width={16}
                            height={12}
                            alt="flag"
                          />
                        </DropdownMenu.Item>
                      );
                    })}
              </ScrollArea>
            </DropdownMenu.Content>
          </DropdownMenu.Root> */}
        </div>

        <div className={styles.names} style={{ marginTop: 10 }}>
          <div>
            <label htmlFor="city">City</label>
            <input
              onChange={(e) => setCity(e.target.value)}
              type="text"
              className="input"
              id="city"
            />
          </div>
          <div>
            <label htmlFor="zip">Zip Code</label>
            <input
              onChange={(e) => setZip(Number(e.target.value))}
              type="text"
              className="input"
              id="zip"
            />
          </div>
        </div>

        <div>Areas of Interests</div>
        <div className={styles.checkmarks}>
          <div className={styles.checkmark}>
            <Checkbox color="default" id="reading" onChange={e => {
                if (e.target.checked) setInterest(prev => [...prev, "reading"]);
                else setInterest(interest.filter(task => task !== "reading"))
            }} />{" "}
            <label htmlFor="reading">Reading</label>
          </div>
          <div className={styles.checkmark}>
            <Checkbox color="default" id="writing" onChange={e => {
                if (e.target.checked) setInterest(prev => [...prev, "writing"]);
                else setInterest(interest.filter(task => task !== "writing"))
            }} />{" "}
            <label htmlFor="writing">Writing</label>
          </div>
          <div className={styles.checkmark}>
            <Checkbox color="default" id="travelling" onChange={e => {
                if (e.target.checked) setInterest(prev => [...prev, "travelling"]);
                else setInterest(interest.filter(task => task !== "travelling"))
            }} />{" "}
            <label htmlFor="travelling">Travelling</label>
          </div>
          <div className={styles.playing}>
            <Checkbox color="default" id="playing" onChange={e => {
                if (e.target.checked) setInterest(prev => [...prev, "playing"]);
                else setInterest(interest.filter(task => task !== "playing"))
            }} />{" "}
            <label htmlFor="playing">Playing</label>
          </div>
        </div>

        <div className={styles.imageUpload}>
          {image === "" ? (
            <label
              className={styles.label}
              htmlFor="upload"
              style={{ cursor: "pointer" }}
            >
              Click to upload your image
            </label>
          ) : (
            <label
              htmlFor="upload"
              style={{
                cursor: "pointer",
                margin: "20px 0",
                display: "flex",
                alignItems: "flex-start",
                gap: 15,
              }}
            >
              <Image src={image as string} height={132} width={132} alt="pic" />
              <div onClick={() => setImage("")}>X</div>
            </label>
          )}
          <input
            id="upload"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={imageHandler}
          />
        </div>
        <button className={styles.button} type="submit">
          Submit
        </button>
      </form>
    </main>
  );
}

export default SignUp;
