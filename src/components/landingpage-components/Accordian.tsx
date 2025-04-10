import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
  export function AccordionDemo() {
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
        <AccordionTrigger className=" text-lg font-medium">How Decentralization comes into picture</AccordionTrigger>
          <AccordionContent className=" text-md font-light">
            Yaphouse lets audience earn and keep badges owned by them not by the platform unlike in youtube or instagram memberships.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="  text-lg font-medium">How YapHouse makes money</AccordionTrigger>
          <AccordionContent className=" text-md font-light">
            YapHouse earns through gas fees NFTs and subscription models
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger className="  text-lg font-medium">If You Support Subscriptions How it is different from Youtube</AccordionTrigger>
          <AccordionContent className=" text-md font-light">
            Youtube takes cut from revenue of superchats and memberships, whereas YapHouse only takes fee for using these services, and the revenue made through it goes to the creator.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger className="  text-lg font-medium">Is it on mainnet?</AccordionTrigger>
          <AccordionContent className=" text-md font-light">
            No not currently but we are working on it. 
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }
  