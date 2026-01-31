import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout-wrapper";

import Home from "@/pages/home";
import ProductsPage from "@/pages/products";
import ProductDetailPage from "@/pages/product-detail";
import CustomOrderPage from "@/pages/custom-order";
import WholesalePage from "@/pages/wholesale";
import ContactPage from "@/pages/contact";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/products" component={ProductsPage} />
        <Route path="/products/:slug" component={ProductDetailPage} />
        <Route path="/custom-order" component={CustomOrderPage} />
        <Route path="/wholesale" component={WholesalePage} />
        <Route path="/contact" component={ContactPage} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
