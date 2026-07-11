-- Create custom enum for application status
CREATE TYPE application_status AS ENUM ('pending', 'approved', 'rejected');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  gender TEXT,
  bio TEXT,
  status application_status DEFAULT 'pending',
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
-- 1. Users can read their own profile
CREATE POLICY "Users can view own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = id);

-- 2. Users can update their own profile
CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

-- 3. Approved users can view other approved users
CREATE POLICY "Approved members can view other approved members" 
ON public.profiles FOR SELECT 
USING (
  (SELECT status FROM public.profiles WHERE id = auth.uid()) = 'approved' 
  AND status = 'approved'
);

-- 4. Admins can view all profiles
CREATE POLICY "Admins can view all profiles" 
ON public.profiles FOR SELECT 
USING (
  (SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = true
);

-- 5. Admins can update all profiles
CREATE POLICY "Admins can update all profiles" 
ON public.profiles FOR UPDATE 
USING (
  (SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = true
);

-- 6. Users can insert their own profile on signup
CREATE POLICY "Users can insert own profile" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Create hobbies table
CREATE TABLE public.hobbies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

-- Enable RLS for hobbies (Read-only for all authenticated users)
ALTER TABLE public.hobbies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Hobbies are viewable by everyone" 
ON public.hobbies FOR SELECT 
USING (true);

-- Create profile_hobbies mapping table
CREATE TABLE public.profile_hobbies (
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  hobby_id UUID REFERENCES public.hobbies(id) ON DELETE CASCADE,
  PRIMARY KEY (profile_id, hobby_id)
);

-- Enable RLS for profile_hobbies
ALTER TABLE public.profile_hobbies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own hobbies" 
ON public.profile_hobbies FOR SELECT 
USING (auth.uid() = profile_id);

CREATE POLICY "Users can insert their own hobbies" 
ON public.profile_hobbies FOR INSERT 
WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can delete their own hobbies" 
ON public.profile_hobbies FOR DELETE 
USING (auth.uid() = profile_id);

-- Insert premium hobby data
INSERT INTO public.hobbies (name) VALUES 
('Contemporary Art'),
('Sailing'),
('Mixology & Fine Spirits'),
('Classical Music'),
('Equestrian Sports'),
('Gastronomy & Fine Dining'),
('Architecture'),
('Vintage Watch Collecting'),
('Philanthropy'),
('Literature & Poetry');
