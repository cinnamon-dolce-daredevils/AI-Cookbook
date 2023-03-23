import React, {useState, useEffect} from 'react'
import { createClient } from '@supabase/supabase-js';
import { useSession } from '@supabase/auth-helpers-react';
import SidebarIngredient from '@/components/SidebarIngredient';
// (connects our app with supabase tables)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);



const test = () => {
  //
  const [fetchError, setFetchError] = useState(null);
  const [ingredients, setIngredients] = useState(null);
  useEffect(() => {
    const fetchIngredients = async () => {
        const { data, error } = await supabase
            .from('pantry')
            .select();

      if (error) {
        setFetchError('Could not fetch ingredients');
        setIngredients('error while fetching ingredients');
        console.log(`while fetching ingredients an error occurred: ${error}`);
      }
      if (data) {
        setIngredients(data);
        setFetchError(null);
      }
    };
    fetchIngredients();
  }, []);
  ////////////////////////////////////////////////////////////////////////////////////
    return (<div>
        {fetchError && (<p>{fetchError}</p>)}
        {ingredients && (
            <div> 
                {ingredients.map(ingredient => (
                    <div> ingredient 
                        {ingredient.id}
                    </div>
                ))}
            </div>
        )}
  </div>)
}

export default test