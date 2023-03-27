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
import { Combobox, DropdownList, NumberPicker } from 'react-widgets';
import { createClient } from '@supabase/supabase-js';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});


const IngredientDetails = (props) => {
	const supabase = createClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
	);
  const [open, setOpen] = React.useState(false);
  const [quantity, setQuantity] = React.useState(props.item.quantity);
  const [unit, setUnit] = React.useState(props.item.unit)

 

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleQuantChange = async() => {
	const { data, error } = await supabase
		.from("pantry")
		// .select({ quantity: quantity, unit: unit })
		.update({ quantity: quantity, unit: unit })
		.eq("id", props.item.id);
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
				// onClose={handleSubmit}
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
						<br /> per serving:{" "}
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
					<div style={{ display: "flex", justifyContent: "space-between" }}>
						<NumberPicker
							precision={1}
							defaultValue={props.item.quantity}
							step={0.1}
							id='servingQuant'
							onChange={(evt) => setQuantity(evt)}
						/>
						<Combobox
							dropUp
							defaultValue={props.item.unit}
							data={[
								"servings",
								"grams",
								"kilograms",
								"ounces",
								"pounds",
								"mL",
								"tablespoons",
								"cups",
							]}
							id='servingUnit'
							onChange={(evt) => setUnit(evt)}
						/>
					</div>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleQuantChange}>Submit</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default IngredientDetails;
