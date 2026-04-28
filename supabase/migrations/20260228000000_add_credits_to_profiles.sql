
-- Add credits column to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS credits NUMERIC(10,2) NOT NULL DEFAULT 0.00;

-- Create a function to update credits when payment is approved
CREATE OR REPLACE FUNCTION public.handle_payment_approval()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'approved' AND OLD.status != 'approved' THEN
    UPDATE public.profiles
    SET credits = credits + NEW.credit_amount
    WHERE user_id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for payment approval
DROP TRIGGER IF EXISTS on_payment_approval ON public.payment_requests;
CREATE TRIGGER on_payment_approval
  AFTER UPDATE ON public.payment_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_payment_approval();

-- Create a function to deduct credits when order is placed
CREATE OR REPLACE FUNCTION public.handle_order_placement()
RETURNS TRIGGER AS $$
BEGIN
  -- Deduct the price from user's credits
  UPDATE public.profiles
  SET credits = credits - NEW.price
  WHERE user_id = NEW.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for order placement
DROP TRIGGER IF EXISTS on_order_placement ON public.orders;
CREATE TRIGGER on_order_placement
  AFTER INSERT ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_order_placement();
