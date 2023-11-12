import { Separator } from "@/components/ui/separator";
import {CategoryForm} from "@/components/dashboard/create/mainForm"

export default function CreateCategoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Category main settings</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see it on the site.
        </p>
      </div>
      <Separator />
      <CategoryForm />
    </div>
  )
}