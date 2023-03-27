import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import styles from './../styles/leftdrawer.module.css';
import "react-widgets/styles.css";
import { DropdownList, NumberPicker } from 'react-widgets';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});


const IngredientDetails = (props) => {
  const [open, setOpen] = React.useState(false);
  console.log(props)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
		<div>
			<div
				className={styles.ingredientItem}
				sx={{ color: "white" }}
				variant='outlined'
				onClick={handleClickOpen}
			>
				{props.item.suggestion[0].name}
				<div>
					<div key={props.index}></div>
					<div>qty</div>
				</div>
			</div>

			{/*                                      */}
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-describedby='alert-dialog-slide-description'
			>
				<DialogTitle sx={{ color: "black" }}>
					{props.item.suggestion[0].name}
				</DialogTitle>
				<DialogContent sx={{ color: "black" }}>
					<DialogContentText
						sx={{ color: "black", p: 2 }}
						id='alert-dialog-slide-description'
					>
						<strong style={{ fontSize: "18px" }}>Ingredient Facts</strong>
						<br /> per serving: {" "}
						{props.item.suggestion[0].amount + props.item.suggestion[0].unit}
						<br />
						<img
							src={`https://spoonacular.com/cdn/ingredients_100x100/${props.item.suggestion[0].image}`}
							alt={props.item.suggestion[0].name}
						/>
						<br />
						Fat: {props.item.suggestion[0].fat} grams
						<br />
						Protein: {props.item.suggestion[0].protein} grams
						<br />
						Carbs: {props.item.suggestion[0].carbs} grams
						<br />
						Calories: {props.item.suggestion[0].calories} kcal
					</DialogContentText>
          <label>Quantity</label>
          <div style={{display:'flex'}}>
          <NumberPicker
          precision={1}
          defaultValue={1}
          step={0.1}/>
          <DropdownList
          defaultValue='servings'
          data={['servings', 'grams', 'kilograms', 'ounces', 'pounds', 'mL', 'tablespoons', 'cups' ]}/>
          </div>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Submit</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default IngredientDetails;
