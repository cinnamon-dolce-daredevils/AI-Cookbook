import { supabase } from '../../utils/supabaseClient';
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function sendExpirationNotifications(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const { data: users, error: usersError } = await supabase.from('UserProfile').select('*');

    if (usersError) throw usersError;

    for (const user of users) {
      const notificationDays = user.notification_days_before_expiration;
      const currentDate = new Date();
      const expirationDate = new Date(currentDate);
      expirationDate.setDate(expirationDate.getDate() + notificationDays);

      const { data: ingredients, error: ingredientsError } = await supabase
        .from('Ingredient')
        .select('*')
        .eq('user_id', user.id)
        .lte('expiration_date', expirationDate);

      if (ingredientsError) throw ingredientsError;

      for (const ingredient of ingredients) {
        const ingredientExpirationDate = new Date(ingredient.expiration_date);
        const daysDifference = Math.ceil((ingredientExpirationDate - currentDate) / (1000 * 60 * 60 * 24));
      
        const msg = {
          to: user.email,
          from: 'noreply@yourapp.com',
          subject: 'Ingredient Expiration Reminder',
          text: `Your ${ingredient.name} is expiring in ${daysDifference} days.`,
        };
      
        await sgMail.send(msg);
      }
    }

    res.status(200).end();
  } catch (error) {
    console.error('Error sending expiration notifications:', error);
    res.status(500).json({ error: 'Failed to send expiration notifications.' });
  }
}