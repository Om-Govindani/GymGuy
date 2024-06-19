import React from "react";
import Button from "./Button";

export default function Hero(){
    return (
        <div className="relative min-h-screen flex flex-col justify-center items-center">
        <div className="h-full flex flex-col gap-10 justify-center items-center max-w-[700px] w-full mx-auto p-4">
            <p>SHAPE YOUR LIFE & BODY</p>
            <h1 className="uppercase font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl ">GYM<span className="bg-gradient-to-r from-sky-500 to-zinc-200 bg-clip-text text-transparent">GUY</span></h1>
            <p className="text-sm md:text-base font-light text-center">I here by acknowledge that I may become a <span className="text-sky-400 font-medium">GymGuy</span> and Accept the challenge of improving my <span className="text-sky-400 font-medium">Lifestyle</span> and <span className="text-sky-400 font-medium">Body</span></p>
            <Button func={()=>{window.location.href='#generate'}} text={"Accept & Begin"}></Button>
        </div>
        <h2 className="absolute bottom-4 text-center">Made With ❤️ by Om Govindani</h2>
        </div>
    );
};