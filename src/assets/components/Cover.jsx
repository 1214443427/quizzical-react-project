import React from "react";

export default function Cover(props){

    const CategoryOptions = props.categories.map(
        category => {
            return (
            <option 
                value={category.id}
                key = {category.id}
                >
                {category.name}
            </option>)
        }
    )

    return(
        <div className="cover">
            <h2>Quizzical</h2>
            <p>Some description if needed</p>
            <span className="select-span">
                <p>Category:</p>
                <select 
                    className="select"
                    name="category" 
                    onChange={(event)=>props.selectOptions(event)}
                    value={props.options.category}
                    >
                        {CategoryOptions}
                </select>
            </span>
            <span className="select-span">
                <p>Difficulty:</p>
                <select 
                    className="select" 
                    name="difficulty" 
                    onChange={(event)=>props.selectOptions(event)}
                    value={props.options.difficulty}
                    >
                        <option value={""}>Any Difficulty</option> 
                        <option value={"easy"}>Easy</option> 
                        <option value={"medium"}>Medium</option> 
                        <option value={"hard"}>Hard</option>                         
                        </select>
            </span>
            <span className="select-span">
                <p>Type:</p>
                <select 
                    className="select" 
                    name="type" 
                    onChange={(event)=>props.selectOptions(event)}
                    value={props.options.type}
                    >
                        <option value={"multiple"}>Multiple Choice</option> 
                        <option value={"boolean"}>True/False Questions</option>                      
                    </select>
            </span>
            <button className="start-button" onClick={props.start}>Start quiz</button>
        </div>
    )
}
