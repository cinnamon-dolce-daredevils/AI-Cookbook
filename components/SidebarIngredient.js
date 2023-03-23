import React from 'react';

const SidebarIngredient = (props) => {
    return (<div className="ingredient-card">
        <h3> {props.suggestion}</h3>
        <p> { props.quantity}</p>
  </div>);
};

export default SidebarIngredient;

// should be implemented after ingredients
// are correctly displaying in sidebar from 
/// supabase