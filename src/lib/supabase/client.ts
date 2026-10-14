import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jegkpabsbstbohyeoaof.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_PPcHjgUIDQT1Q5zi3qKElQ_w4QZU6Nf'

// Pastikan ada kata "export" di depan konstanta supabase ini
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
