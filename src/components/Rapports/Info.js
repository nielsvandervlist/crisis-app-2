function Info({rapport}) {
    return <div className={'rapport-info'}>
        <div className={'rapport-info__head mb-4'}>
            <h1>Communication Crisis Training Report: {rapport.data.crisis.title}</h1>
            <h3>Company name: {rapport.data.company.name}</h3>
            <span>Date: {rapport.data.created_at}</span>
        </div>
        <div className={'mb-4'}>
            <h2>Overview:</h2>
            <p>The communication crisis training was held on {rapport.data.created_at} and was attended
                by {rapport.data.participants.length} participants from
                various departments within the organization. The goals of the training were to:</p>
        </div>
        <div className={'rapport-info__participants mb-8'}>
            <h3 className={'mb-4'}>Participants</h3>
            <div className={'flex'}>
                {
                    rapport.data.participants.map((participant, index) => {
                        return <div className={'rounded-md bg-gray-100 p-4'} key={index}>
                            <div className={'font-semibold'}>{participant.name}</div>
                            <div className={''}>{participant.email}</div>
                        </div>
                    })
                }
            </div>
        </div>
        <div className={'mb-4'}>
            <h2>Key takeaways</h2>
            <ul>
                <li>Provide an understanding of the key principles of effective crisis communication</li>
                <li>Familiarize participants with the organization's crisis communication plan</li>
                <li>Practice using different communication channels and tactics in a simulated crisis scenario</li>
            </ul>
        </div>
        <div className={'mb-4'}>
            <p>The importance of preparation in crisis communication: It is crucial to have a plan in place and to regularly
                review and update it in order to be able to respond effectively to a crisis.
                The need for clear and consistent messaging: It is important to have a single, clear message that is consistent
                across all communication channels and that is communicated to all relevant parties.
                The value of transparency and honesty: In a crisis, it is important to be open and transparent about the
                situation and to provide accurate information as it becomes available.
                Training Format:</p>
        </div>
        <div className={'mb-4'}>
                <p>The training was held virtually and consisted of [Number] hours of instruction. Participants were
                provided with [List of materials provided, e.g. handouts, reference materials].</p>
        </div>
        <div className={'mb-4'}>
            <h3>Feedback and Evaluation:</h3>
            <p>Overall, participants rated the training as [Positive/Neutral/Negative] and provided the following feedback:</p>
            [List of feedback from participants]
        </div>
        <div className={'rapport-info__stats mb-4'}>
            <h3>Number of posts: {rapport.data.posts}</h3>
            <span>Number of reactions</span>
        </div>
        <div className={'rapport-info__scores'}>
            <h3 className={'block mb-2'}>Scores</h3>
            <div className={'flex'}>
                <div className={'rapport-info__score text-center'}>
                    <p className={'flex mb-2'}><span
                        className={'block btn btn--label-small mr-2'}>{rapport.data.reaction_score}/10</span>Reaction
                        score</p>
                    <p className={'flex mb-2'}><span
                        className={'block btn btn--label-small mr-2'}>{rapport.data.sharing_score}/10</span>Sharing
                        score</p>
                    <p className={'flex mb-2'}><span
                        className={'block btn btn--label-small mr-2'}>{rapport.data.content_score}/10</span>Content
                        score</p>
                </div>
            </div>
        </div>
        <div className={'mb-4'}>
            <h3>Follow-Up Actions:</h3>
            <p>Based on the feedback received and observations made during the training, the following actions are recommended:</p>
            [List of recommendations for follow-up actions or further training]
        </div>
    </div>
}

export default Info
