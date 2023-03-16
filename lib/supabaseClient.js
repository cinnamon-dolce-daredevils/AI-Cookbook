import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
	"https://ufwbfmylvwxrwvxznnxz.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmd2JmbXlsdnd4cnd2eHpubnh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg5OTk0NTgsImV4cCI6MTk5NDU3NTQ1OH0.5rAmwb2bSjnt4bgoTb8rhUTsXChukNh4DnMaZPLwenA"
);
