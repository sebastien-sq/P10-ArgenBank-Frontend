import AccountType from "./AccountType"


export default function Features(){

  const accountTypes = [
    {
      title: "You are our #1 priority",
      image: "./img/icon-chat.webp",
      description: "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.",
    },
    {
      title: "More savings means higher rates",
      image: "./img/icon-money.webp",
      description: "The more you save with us, the higher your interest rate will be!",
    },
    {
      title: "Security you can trust",  
      image: "./img/icon-security.webp",
      description: "We use top of the line encryption to make sure your data and money is always safe.",
    },
  ]
    return (
    <section className="features ">
        <h2 className="sr-only">Features</h2>
        <div className="account-types"> 
          {accountTypes.map((accountType) => (
            <AccountType key={accountType.title} {...accountType} />
          ))}
        </div>
      </section>
      )
}