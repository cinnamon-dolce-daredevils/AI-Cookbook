import * as React from 'react';
import { useState } from 'react';
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
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { IconButton } from '@mui/material';
import { useMute } from './MuteContext';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});



function playAudio(audioPath) {
  const audio = new Audio(audioPath);
  audio.play();
}

const IngredientDetails = (props) => {
  const { isMuted } = useMute();
	const supabase = createClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
	);
  const [open, setOpen] = React.useState(false);
  const [quantity, setQuantity] = React.useState(props.item.quantity);
  const [unit, setUnit] = React.useState(props.item.unit)
  const [hoverDelete, setHoverDelete] = useState(false);


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

  const handleDeleteIcon = async(evt)=>{
    if (!isMuted) {
  playAudio('/audio/Short.m4a');}
	evt.stopPropagation();
	setOpen(false)
	const {data, error} = await supabase
	.from('pantry')
	.delete()
	.eq("id", props.item.id)

	if(!data){
		return(
			<div>Deleting...</div>
		)
	}
  }

  return (
		<div>
			<div
				className={styles.ingredientItem}
				sx={{ color: "white" }}
				onClick={handleClickOpen}
			>
					<div variant='outlined' 
					 key={props.index} >
						{props.item.suggestion[0].name}
					</div>
					<div>
					<IconButton onMouseEnter={() => setHoverDelete(true)}
  onMouseLeave={() => setHoverDelete(false)}
  onClick={(event) => handleDeleteIcon(event)}
>
  {hoverDelete ? <DeleteTwoToneIcon sx={{ color: "purple" }} /> : <DeleteIcon />}
					</IconButton>
					</div>
			</div>
      <Dialog
  open={open}
  TransitionComponent={Transition}
  keepMounted
  onClose={() => setOpen(false)}
  aria-describedby='alert-dialog-slide-description'
>
  <DialogTitle className={styles.dialogTitle}>
    <strong>{props.item.suggestion[0].name}</strong>
  </DialogTitle>
  <DialogContent sx={{ color: 'black' }}  className={styles.dialogBox}>
    <DialogContentText
      sx={{ color: 'black', p: 2 }}
      id='alert-dialog-slide-description'
    ><div className={styles.nutrtionFacts}>Nutrition Facts</div>
      <div className={styles.perServing}><span className={styles.fatLabel}>per serving:{" "}</span>
						{props.item.suggestion[0].amount + props.item.suggestion[0].unit}</div>
      <div className={styles.calories}>
        <span className={styles.caloriesLabel}>Calories:</span>
        {props.item.suggestion[0].calories} kcal
      </div>
      <div className={styles.fat}>
        <span className={styles.fatLabel}>Fat:</span> {props.item.suggestion[0].fat} grams
      </div>
      <div className={styles.carbs}>
        <span className={styles.carbsLabel}>Carbohydrates:</span> {props.item.suggestion[0].carbs} grams
      </div>
      <div className={styles.protein}>
        <span className={styles.proteinLabel}>Protein:</span> {props.item.suggestion[0].protein} grams
      </div>
      </DialogContentText>
      <img
        className={styles.nutritionImg}
        src={`https://spoonacular.com/cdn/ingredients_100x100/${props.item.suggestion[0].image}`}
        alt={props.item.suggestion[0].name}
      />
    <label>Quantity</label>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <NumberPicker
        precision={1}
        defaultValue={props.item.quantity}
        step={0.1}
        className='servingQuant'
        onChange={(evt) => setQuantity(evt)}
      />
      <Combobox
        dropUp
        defaultValue={props.item.unit}
        data={[
          'servings',
          'grams',
          'kilograms',
          'ounces',
          'pounds',
          'mL',
          'tablespoons',
          'cups',
        ]}
        className='servingUnit'
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
