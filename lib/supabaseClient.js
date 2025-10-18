import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cywpjtpcrvtcojyljlsj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5d3BqdHBjcnZ0Y29qeWxqbHNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2NTM5NzEsImV4cCI6MjA3NjIyOTk3MX0.i8F-TxCGyMlDz9NKSD8xEP_ssdAEx0ExNs2c_j83go4";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
