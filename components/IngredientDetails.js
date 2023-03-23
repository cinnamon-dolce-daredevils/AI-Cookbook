import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import styles from './../styles/leftdrawer.module.css';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});


const IngredientDetails = (props) => {
  const [open, setOpen] = React.useState(false);

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
        sx={{ color: 'white' }}
        variant="outlined"
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
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ color: 'black' }}>
          {props.item.suggestion[0].name}
        </DialogTitle>
        <DialogContent sx={{ color: 'black' }}>
          <DialogContentText
            sx={{ color: 'black' }}
            id="alert-dialog-slide-description"
                  >
                      qty: {props.item.quantity}
                      <br/>
                      <img
                      src={`https://spoonacular.com/cdn/ingredients_100x100/${props.item.suggestion[0].image}`}
                      alt={props.item.suggestion[0].name}
                      />
                      <br/>
                      Here is a basic description of stuff so the dialog box is bigger
                      <br/>
            Fat: {props.item.suggestion[0].fat}
            <br />
            Protein: {props.item.suggestion[0].protein}
            <br />
            Carbs: {props.item.suggestion[0].carbs}
            <br />
            Calories: {props.item.suggestion[0].calories}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>x</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default IngredientDetails;
