import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from '../utils/axiosWithAuth'
import styled from 'styled-components'

const Form = styled.form`
display: flex;


`
const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const refreshColors = _ => {
    axiosWithAuth()
      .get('/api/colors')
      .then(res => updateColors(res.data))
      .catch(err => console.log(err))
  }
  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`,colorToEdit)
        .then(refreshColors())
        .catch(err => console.log(err))
    
  };

  const deleteColor = color => {
    
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
        .then(refreshColors())
        .catch(err => console.log(err))
    
    // make a delete request to delete this color
  };

  //FORM STUFF FOR SUBMIT

  const initialNewColor = {color: "", code: ""}
  const [newColor, setNewColor] = useState(initialNewColor)
  const newColorSubmit = event => {
    event.preventDefault()
    axiosWithAuth()
      .post('/api/colors',newColor)
        .then(res => {
          console.log(res)
          refreshColors()
        })
        .catch(err => console.log(err))
  }

  const handleColorChange = event => {
    event.preventDefault()
    setNewColor({
      ...newColor,
      [event.target.name]: event.target.value
    })
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      <div className = "new-color">
      <h3>Add A New Color!</h3>
        <Form onSubmit = {newColorSubmit}>
          
          <div className = "input-group">
            <label htmlFor = "name" id = "name">Color Name: </label>
            <input onChange = {handleColorChange} type = "text" name = "color" value = {newColor.color}/>
          </div>
          <div className = "input-group">
            <label htmlFor = "code" id = "code">Color Hex: </label>
            <input onChange = {handleColorChange} type = "text" name = "code"value = {newColor.code}/>
          </div>
          <div className = "input-group">
            <button>Submit!</button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ColorList;
