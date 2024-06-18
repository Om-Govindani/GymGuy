import React, { useState } from "react";
import { SCHEMES, WORKOUTS } from "../utils/Guy";
import SectionWrapper from "./SectionWrapper";
import Button from "./Button";

function Header(props){
    const {index , title , description} = props;
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-center gap-2">
                <p className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-400">{index}</p>
                <h4 className="text-xl sm:text-2xl md:text-3xl">{title} </h4>
            </div>
            <p className="text-sm sm:text-base mx-auto ">{description}</p>
        </div>
    )
}

export default function Generator(props){
    const {poison, setPoison , muscles , setMuscles , goals , setGoals , updateWorkout} = props;
    const [showModal,setShowModal] = useState(false);


    function updateMuscles(muscleGroup) {
        if (muscles.includes(muscleGroup)) {
            setMuscles(muscles.filter(val => val !== muscleGroup))
            return
        }
        if (muscles.length > 2) return

        if (poison !== 'individual') {
            setMuscles([muscleGroup])
            setShowModal(false)
            return
        }

        setMuscles([...muscles, muscleGroup])
        if (muscles.length === 2) {
            setShowModal(false)
        }

    }

    return (
        <SectionWrapper id={'generate'} header={"Generate Your Workout"} title={['It\'s','Huge','o\'Clock']}>
            <Header index={"01."} title={"Pick your Poison"} description = {"Select the Workout you wish to endured"}/>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Object.keys(WORKOUTS).map((type,typeIndex)=>{
                return(
                    <button 
                    onClick={()=>
                        {setMuscles([])
                        setPoison(type)}} 
                    className={'bg-slate-950 border-2 px-4 py-4 rounded-lg duration-200 hover:border-sky-400'+( type === poison ? ' border-sky-400' : ' border-blue-600')} key={typeIndex}>
                        <p className="capitalize">{type.replaceAll('_'," ")}</p>
                    </button>
                );
            })}
            </div>

            <Header index={"02."} title={"Lock on Targets"} description = {"Select the muscles judged for Annihilation"}/>
            <div className="bg-slate-950 border-2 border-solid border-blue-600 duration-200 hover:border-sky-400 py-3 rounded-lg flex flex-col">
                <button 
                onClick={()=>{setShowModal(!showModal)}} 
                className="relative flex items-center justify-center p-3">
                    <p className='capitalize'>{muscles.length == 0 ? 'Select muscle groups' : muscles.join(' ')}</p>
                    <i className="fa-solid absolute right-3 top-1/2 -translate-y-1/2 fa-caret-down"></i>
                </button>
                {showModal && (<div className="flex flex-col px-3 py-3">
                    {(poison === 'individual' ? WORKOUTS[poison] : Object.keys(WORKOUTS[poison])).map((muscleGroup,muscleGroupIndex)=>
                    {
                        return (
                            <button onClick={() => {
                                updateMuscles(muscleGroup)
                            }} key={muscleGroupIndex} className={'hover:text-sky-400 duration-200 py-2' + (muscles.includes(muscleGroup) ? ' text-blue-400' : ' ')}>
                                <p className='uppercase'>{muscleGroup.replaceAll('_', ' ')}</p>
                            </button>
                        )
                    })}
                    </div>)}
            </div>

            <Header index={"03."} title={"Become Juggernaut"} description = {"Select your ultimate Objective"}/>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Object.keys(SCHEMES).map((scheme,schemeIndex)=>{
                return(
                    <button 
                    onClick={()=>{setGoals(scheme)}} 
                    className={'bg-slate-950 border-2 px-4 py-4 rounded-lg duration-200 hover:border-sky-400'+(scheme===goals ? ' border-sky-400':' border-blue-600')} key={schemeIndex}>
                        <p className="capitalize">{scheme.replaceAll('_'," ")}</p>
                    </button>
                );
            })}
            </div>
            <Button func={updateWorkout} text={"Formulate"}></Button>
        </SectionWrapper>
        
    );
};
