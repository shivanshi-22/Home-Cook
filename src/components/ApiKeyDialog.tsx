import { useState } from "react";
import { Settings, Key, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { setApiKey, hasApiKey } from "@/services/recipeApi";

export const ApiKeyDialog = () => {
  const [key, setKey] = useState("");
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (key.trim()) {
      setApiKey(key.trim());
      setSaved(true);
      setTimeout(() => {
        setOpen(false);
        setSaved(false);
        setKey("");
      }, 1500);
    }
  };

  const isKeySet = hasApiKey();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className={`gap-2 ${isKeySet ? 'bg-green-fresh/10 border-green-fresh/20 text-green-fresh' : ''}`}
        >
          {isKeySet ? <Key className="w-4 h-4" /> : <Settings className="w-4 h-4" />}
          {isKeySet ? 'API Key Set' : 'Set API Key'}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Spoonacular API Configuration</DialogTitle>
          <DialogDescription>
            Enter your Spoonacular API key to search for real recipes. Without it, you'll see demo recipes.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Alert>
            <ExternalLink className="h-4 w-4" />
            <AlertDescription>
              Get your free API key from{" "}
              <a 
                href="https://spoonacular.com/food-api" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                spoonacular.com/food-api
              </a>
              . Free tier includes 150 requests per day.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label htmlFor="api-key">API Key</Label>
            <Input
              id="api-key"
              type="password"
              placeholder="Enter your Spoonacular API key..."
              value={key}
              onChange={(e) => setKey(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            />
          </div>

          {saved ? (
            <Alert className="bg-green-fresh/10 border-green-fresh/20">
              <AlertDescription className="text-green-fresh">
                ✓ API key saved successfully!
              </AlertDescription>
            </Alert>
          ) : (
            <div className="flex gap-2">
              <Button onClick={handleSave} disabled={!key.trim()}>
                Save API Key
              </Button>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </div>
          )}

          <Alert>
            <AlertDescription className="text-xs text-muted-foreground">
              Your API key is stored locally in your browser and never sent to our servers.
            </AlertDescription>
          </Alert>
        </div>
      </DialogContent>
    </Dialog>
  );
};