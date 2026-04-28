
-- Create services table
CREATE TABLE IF NOT EXISTS public.services (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    category TEXT NOT NULL,
    name TEXT NOT NULL,
    group_name TEXT NOT NULL DEFAULT 'General',
    price NUMERIC NOT NULL DEFAULT 0,
    delivery TEXT NOT NULL DEFAULT '1-5 Minutes',
    tag TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Public can view active services
CREATE POLICY "Public can view active services"
ON public.services FOR SELECT
USING (is_active = true);

-- Admins can manage all services
CREATE POLICY "Admins can manage all services"
ON public.services
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Seed initial data
INSERT INTO public.services (category, name, group_name, price, delivery, tag)
VALUES 
('imei', 'USA T-Mobile iPhone [CLEAN]', 'iPhone Worldwide', 25.00, '1-3 Days', 'HOT'),
('imei', 'USA AT&T iPhone Unlock', 'iPhone Worldwide', 15.00, '1-24 Hours', 'FAST'),
('server', 'UnlockTool 1 Year Activation', 'Digital Licenses', 55.00, 'Instant', 'BEST'),
('remote', 'iRemoval Pro Premium', 'iCloud Services', 45.00, '1-5 Minutes', 'NEW');
