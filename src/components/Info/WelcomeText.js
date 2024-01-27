export default function WelcomeText({user}){
    return <div className={'card col-span-6'}>
        <h3 className={'mb-4'}>Dear {user.name},</h3>
        <p className={'mb-4'}>Welcome to our Communication Crisis Training! We are thrilled to have you join us in this interactive
            and educational experience. Our goal is to equip you with the tools and strategies necessary to
            effectively navigate and respond to crisis situations.</p>
        <p className={'mb-4'}>Through the online dashboard, you will have access to a variety of resources and activities designed
            to enhance your understanding of communication in crisis situations. You will also have the
            opportunity to engage with other participants and industry experts to exchange ideas and best
            practices.</p>
        <p className={'mb-4'}>We encourage you to take full advantage of this opportunity and are eager to support you on your
            learning journey. Let's get started!</p>
        <p className={'mb-4'}>Best regards,</p>
        <p>[Training Team]</p>
    </div>
}
