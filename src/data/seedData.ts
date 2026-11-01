import { Question, Topic, User, Notification } from '../types';

export const CURRENT_USER: User = {
  id: 'user_alex_mercer',
  name: 'Alex Mercer',
  handle: '@alexmercer',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AlexMercer&backgroundColor=b6e3f4',
  headline: 'Product Architect & Distributed Systems Engineer',
  bio: 'Building resilient backend networks and high-throughput systems. Fascinated by cognitive architectures, deep tech, and clear thinking.',
  followersCount: 1420,
  followingCount: 388,
  questionsCount: 4,
  answersCount: 19,
  upvotesCount: 4890,
  joinedDate: 'Joined March 2024',
  interests: ['Technology', 'Artificial Intelligence', 'System Architecture', 'Design'],
};

export const SEED_USERS: User[] = [
  CURRENT_USER,
  {
    id: 'user_elena_rostova',
    name: 'Dr. Elena Rostova',
    handle: '@elena_quantum',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ElenaRostova&backgroundColor=ffd5dc',
    headline: 'Senior Research Fellow in Quantum Information at Oxford',
    bio: 'Theoretical physicist researching topological quantum computation, error correction codes, and superconducting qubit architectures.',
    followersCount: 18450,
    followingCount: 215,
    questionsCount: 12,
    answersCount: 142,
    upvotesCount: 68400,
    joinedDate: 'Joined January 2023',
    interests: ['Quantum Computing', 'Physics', 'Science', 'Deep Tech'],
    isFollowing: true,
  },
  {
    id: 'user_marcus_vance',
    name: 'Marcus Vance',
    handle: '@marcus_vance',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MarcusVance&backgroundColor=d1d4f9',
    headline: 'Staff Product Designer at Linear · Former Figma Lead',
    bio: 'Obsessed with software craft, typographic rhythm, and micro-interactions. Writing on why tools shape how minds collaborate.',
    followersCount: 9230,
    followingCount: 410,
    questionsCount: 8,
    answersCount: 86,
    upvotesCount: 34100,
    joinedDate: 'Joined June 2023',
    interests: ['Design', 'Product Management', 'Typography', 'UX Research'],
    isFollowing: true,
  },
  {
    id: 'user_priya_nair',
    name: 'Dr. Priya Nair',
    handle: '@dr_priyanair',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PriyaNair&backgroundColor=ffdfbf',
    headline: 'Cognitive Neuroscientist & Director of Neuroplasticity Lab',
    bio: 'Investigating memory consolidation during deep slow-wave sleep and non-invasive neural modulation techniques.',
    followersCount: 12100,
    followingCount: 180,
    questionsCount: 15,
    answersCount: 95,
    upvotesCount: 41200,
    joinedDate: 'Joined November 2023',
    interests: ['Neuroscience', 'Psychology', 'Health', 'Biology'],
    isFollowing: false,
  },
  {
    id: 'user_liam_sterling',
    name: 'Liam Sterling',
    handle: '@liam_sterling',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LiamSterling&backgroundColor=c0aede',
    headline: '2x Founder · Angel Investor in Open Source Infrastructure',
    bio: 'Scaled developer platforms from 0 to 8-figure ARR. Sharing unfiltered operator learnings on fundraising, hiring, and product-market fit.',
    followersCount: 15800,
    followingCount: 520,
    questionsCount: 22,
    answersCount: 130,
    upvotesCount: 55900,
    joinedDate: 'Joined September 2022',
    interests: ['Startups', 'Entrepreneurship', 'Venture Capital', 'Technology'],
    isFollowing: false,
  },
  {
    id: 'user_sarah_jenkins',
    name: 'Sarah Jenkins',
    handle: '@sarahj_astro',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SarahJenkins&backgroundColor=b6e3f4',
    headline: 'Aerospace Propulsion Engineer & Orbital Mechanics Consultant',
    bio: 'Working on next-gen methane-oxygen rocket engines and deep space trajectory design.',
    followersCount: 7600,
    followingCount: 310,
    questionsCount: 5,
    answersCount: 47,
    upvotesCount: 18300,
    joinedDate: 'Joined April 2024',
    interests: ['Space Exploration', 'Physics', 'Engineering'],
    isFollowing: true,
  },
];

export const SEED_TOPICS: Topic[] = [
  {
    id: 'topic_tech',
    name: 'Technology',
    slug: 'technology',
    description: 'Hardware, software, open source, computing paradigms, and digital evolution.',
    icon: 'Cpu',
    followersCount: 142000,
    isFollowing: true,
    questionsCount: 14820,
  },
  {
    id: 'topic_ai',
    name: 'Artificial Intelligence',
    slug: 'artificial-intelligence',
    description: 'Foundation models, inference systems, neural networks, ethics, and agent architectures.',
    icon: 'Sparkles',
    followersCount: 218000,
    isFollowing: true,
    questionsCount: 24150,
  },
  {
    id: 'topic_science',
    name: 'Science & Physics',
    slug: 'science',
    description: 'Fundamental physics, chemistry, quantum phenomena, and cosmology.',
    icon: 'Atom',
    followersCount: 98000,
    isFollowing: true,
    questionsCount: 9320,
  },
  {
    id: 'topic_design',
    name: 'Product Design & UX',
    slug: 'design',
    description: 'Interface architecture, typography, human interaction, and design systems.',
    icon: 'Palette',
    followersCount: 84000,
    isFollowing: false,
    questionsCount: 7110,
  },
  {
    id: 'topic_startups',
    name: 'Startups & Business',
    slug: 'startups',
    description: 'Product-market fit, venture financing, company culture, and execution.',
    icon: 'TrendingUp',
    followersCount: 112000,
    isFollowing: false,
    questionsCount: 11840,
  },
  {
    id: 'topic_neuroscience',
    name: 'Neuroscience & Mind',
    slug: 'neuroscience',
    description: 'Cognition, mental models, memory formation, and consciousness.',
    icon: 'Brain',
    followersCount: 67000,
    isFollowing: false,
    questionsCount: 5290,
  },
  {
    id: 'topic_space',
    name: 'Space Exploration',
    slug: 'space-exploration',
    description: 'Orbital mechanics, telescopes, rocketry, Mars missions, and planetary science.',
    icon: 'Rocket',
    followersCount: 92000,
    isFollowing: false,
    questionsCount: 6840,
  },
  {
    id: 'topic_philosophy',
    name: 'Philosophy & Ethics',
    slug: 'philosophy',
    description: 'Epistemology, rational discourse, moral dilemmas, and existential questions.',
    icon: 'BookOpen',
    followersCount: 53000,
    isFollowing: false,
    questionsCount: 4210,
  },
];

export const SEED_QUESTIONS: Question[] = [
  {
    id: 'q_1',
    author: SEED_USERS[3], // Priya Nair
    title: 'Why does caffeine stop working for focus after long consecutive days, and how does the brain actually reset adenosine sensitivity?',
    description: 'Many knowledge workers drink 300mg+ daily and notice that by day 10, the wakefulness boost is replaced with jittery fatigue. What is occurring biologically at the receptor level, and what is the shortest protocol to restore baseline sensitivity without severe withdrawal?',
    topics: ['Neuroscience & Mind', 'Science & Physics'],
    createdAt: '2 hours ago',
    views: 8420,
    followersCount: 142,
    isFollowing: true,
    isBookmarked: false,
    answers: [
      {
        id: 'ans_1_1',
        questionId: 'q_1',
        author: SEED_USERS[1], // Elena Rostova
        createdAt: '1 hour ago',
        upvotes: 428,
        isUpvoted: true,
        comments: [
          {
            id: 'c_1_1_1',
            answerId: 'ans_1_1',
            author: SEED_USERS[0], // Current User Alex
            content: 'The point regarding the 120-minute morning delay made a remarkable difference in my afternoon crashes. Have you observed any synergy with L-Theanine ratios during the taper?',
            createdAt: '45 mins ago',
            upvotes: 18,
            isUpvoted: false,
          },
          {
            id: 'c_1_1_2',
            answerId: 'ans_1_1',
            author: SEED_USERS[3], // Priya
            content: 'Yes! A 2:1 ratio of L-Theanine (200mg) to caffeine (100mg) modulates alpha brain wave activity and mitigates peripheral vasoconstriction.',
            createdAt: '30 mins ago',
            upvotes: 24,
            isUpvoted: true,
          },
        ],
        content: `Caffeine is chemically an adenosine receptor antagonist (specifically targeting A1 and A2A receptors in the basal forebrain and striatum). It does not generate biological energy; instead, it blocks the molecular signal that informs your brain you are fatigued.

Here is what happens when you drink it continuously:

1. Receptor Up-regulation (The Tolerance Trap)
Because the adenosine receptors are perpetually barricaded, the neuron compensatory homeostatic mechanism takes over. Your brain synthesizes *thousands of new adenosine receptor sites* per cell to restore signaling. When those new receptors arrive, your regular 200mg dose only fills a small fraction of them. The remaining receptors bind ambient adenosine, leaving you feeling foggy even after consuming coffee.

2. The Cortisol Desensitization
High continuous intake chronically elevates basal cortisol and norepinephrine. Over 7 to 10 days, adrenal responsiveness blunts, meaning you no longer get the clean sympathetic alertness boost, only elevated heart rate and fragmented REM sleep architecture.

3. The Optimal 5-Day Reset Protocol
- Days 1–2: Reduce consumption by 50%, and delay your first cup until 90–120 minutes post-waking. This allows your natural cortisol peak to clear accumulated overnight adenosine without caffeine interference.
- Day 3: Switch exclusively to high-polyphenol green tea (e.g., Gyokuro or Matcha, containing roughly 35mg caffeine alongside 60mg L-theanine).
- Days 4–5: Complete abstinence. Hydrate with electrolyte-dense water and supplement with 300mg magnesium glycinate in the evening.

By Day 6, the excess A1/A2A receptors are largely internalized and degraded via endocytosis, restoring your baseline sensitivity.`,
      },
      {
        id: 'ans_1_2',
        questionId: 'q_1',
        author: SEED_USERS[4], // Liam Sterling
        createdAt: '40 mins ago',
        upvotes: 89,
        isUpvoted: false,
        comments: [],
        content: `From an operator perspective managing 14-hour sprints: the single greatest lever is never using caffeine as a substitute for 7.5 hours of sleep.

I now run a strict 3-weeks-on, 1-week-off cycle. During the off week, I swap espresso for cold showers and a brisk 20-minute sunlight walk first thing in the morning. Your focus won't drop nearly as much if your circadian alignment is solid.`,
      },
    ],
  },
  {
    id: 'q_2',
    author: SEED_USERS[0], // Current User Alex
    title: 'What architectural shifts will replace traditional microservices in modern high-throughput SaaS by 2027?',
    description: 'We have seen teams encounter extreme network latency, distributed transaction nightmares, and staggering cloud bills due to over-fragmented microservices. Are modular monoliths, distributed stateful actors, or Edge-WASM hybrids the actual endgame?',
    topics: ['Technology', 'System Architecture'],
    createdAt: '5 hours ago',
    views: 12400,
    followersCount: 310,
    isFollowing: true,
    isBookmarked: true,
    answers: [
      {
        id: 'ans_2_1',
        questionId: 'q_2',
        author: SEED_USERS[2], // Marcus Vance
        createdAt: '3 hours ago',
        upvotes: 612,
        isUpvoted: false,
        comments: [
          {
            id: 'c_2_1_1',
            answerId: 'ans_2_1',
            author: SEED_USERS[4], // Liam
            content: 'Spot on. We slashed our AWS bill by 62% simply by collapsing 14 chatty microservices into one cohesive Go service with internal in-memory channels.',
            createdAt: '2 hours ago',
            upvotes: 32,
            isUpvoted: false,
          },
        ],
        content: `The pendulum is swinging decisively away from "fine-grained microservices for the sake of organizational purity" toward **Co-located Modular Systems with Authoritative State**.

Here are the three structural evolutions happening right now:

1. The Re-emergence of the Engineered Modular Monolith
Teams realized that breaking a single business domain across 40 network boundaries creates distributed consistency problems that require Kafka, Saga patterns, and two-phase commits to paper over. With modern languages (Rust, Go, TypeScript with strict workspace boundaries), you get strict compile-time boundaries without the network penalty. A single in-process function call takes nanoseconds; an RPC hop takes 8ms to 45ms.

2. Ephemeral Compute at the Edge + Durable Objects
Instead of routing every user keystroke back to ` + '`us-east-1`' + `, modern collaborative architectures (like Figma, Linear, and Fly.io machines) spin up dedicated in-memory actor nodes closest to the user. State lives in memory during active collaboration and syncs asynchronously to durable columnar storage.

3. WASM Component Model for Safe Extensibility
Instead of deploying separate microservice pods just to execute third-party plugins or customer webhook workers, teams are embedding lightweight WASM runtimes (Wasmtime, Extism) directly in the host process. Isolation with zero network overhead.

The takeaway: Stop splitting systems by department hierarchy; split them only when physical scaling bottlenecks or regulatory boundaries strictly mandate isolation.`,
      },
    ],
  },
  {
    id: 'q_3',
    author: SEED_USERS[1], // Elena Rostova
    title: 'How close are we to fault-tolerant quantum error correction that can run Shor’s algorithm on RSA-2048 keys?',
    description: 'Recent surface-code demonstrations claim breakthrough threshold fidelities. What physical qubit numbers and gate error rates are truly needed before cryptographic standards are breached?',
    topics: ['Science & Physics', 'Quantum Computing', 'Technology'],
    createdAt: '1 day ago',
    views: 19800,
    followersCount: 520,
    isFollowing: false,
    isBookmarked: false,
    answers: [
      {
        id: 'ans_3_1',
        questionId: 'q_3',
        author: SEED_USERS[5], // Sarah Jenkins
        createdAt: '18 hours ago',
        upvotes: 840,
        isUpvoted: true,
        comments: [
          {
            id: 'c_3_1_1',
            answerId: 'ans_3_1',
            author: SEED_USERS[1], // Elena
            content: 'Terrific summary of Gidney & Ekerå’s optimizations. The real bottleneck today remains the cryogenic control wiring interconnect density.',
            createdAt: '12 hours ago',
            upvotes: 45,
            isUpvoted: false,
          },
        ],
        content: `To break an RSA-2048 key using Shor's algorithm, you require approximately 4,098 logical qubits and on the order of 10^8 to 10^9 modular arithmetic operations (primarily quantum Fourier transform and modular exponentiation).

The gulf lies between **physical qubits** and **logical error-corrected qubits**.

Using standard rotated surface codes with a distance of d = 27 and a physical two-qubit gate error rate of 10^-3 (the current experimental frontier):
- You need roughly 1,000 to 2,000 physical qubits to yield **ONE** stable logical qubit.
- Multiplying this out: Factorization of RSA-2048 requires on the order of **4 million to 10 million physical qubits**.

Current state-of-the-art machines boast between 100 and 1,200 physical noisy qubits. While algorithmic innovations (such as Craig Gidney and Martin Ekerå’s 2021 blueprint) reduced the logical runtime from years down to approximately 8 hours on a hypothetical quantum computer, the hardware engineering constraints (cryostat heat loads, microwave crosstalk, and real-time syndrome extraction FPGA loops) place commercial-scale RSA decryption realistically beyond 2035.

This is why NIST has already standardized Post-Quantum Cryptography (ML-KEM / Kyber, ML-DSA / Dilithium) so networks can migrate proactively long before the hardware matures.`,
      },
    ],
  },
  {
    id: 'q_4',
    author: SEED_USERS[4], // Liam Sterling
    title: 'What is the most misunderstood reality of raising a Seed round in today’s venture environment?',
    description: 'Founders frequently ask about pitch deck templates and valuation benchmarks. But what actually happens behind closed doors in partner meetings?',
    topics: ['Startups & Business'],
    createdAt: '2 days ago',
    views: 15300,
    followersCount: 412,
    isFollowing: false,
    isBookmarked: true,
    answers: [
      {
        id: 'ans_4_1',
        questionId: 'q_4',
        author: SEED_USERS[4], // Liam Sterling
        createdAt: '1 day ago',
        upvotes: 934,
        isUpvoted: false,
        comments: [],
        content: `The biggest misconception is that seed investors invest in your current product features.

They don't. At seed, your product will change three times within eighteen months. What top-tier seed funds evaluate in the room is:

1. Velocity of Iteration
How much tangible progress did you create between meeting 1 and meeting 2? If you shipped two major features, closed three design partners, and learned why an initial thesis was flawed in 7 days, you exhibit anomalous founder velocity.

2. Proprietary Insight ("Earned Secret")
Can you articulate something true about your market that 99% of people disagree with or overlook? If your pitch deck reads like a Gartner summary, you are competing on capital rather than insight.

3. Distribution Engine vs. Pure Feature
Great engineers build products; enduring founders build distribution loops that turn users into evangelists without spending $150 CPA on paid ads.

When you pitch, stop dwelling on the 5-year TAM spreadsheet. Spend 80% of your time proving why your team has the relentless agency to survive the trough of sorrow and discover repeatable retention.`,
      },
    ],
  },
  {
    id: 'q_5',
    author: SEED_USERS[2], // Marcus Vance
    title: 'Why do most modern web applications feel sluggish even on 12-core workstations, and how do we design for true 60fps interaction?',
    description: 'Despite devices possessing gigahertz CPUs, basic dropdowns and typing boxes stutter. What is the fundamental breakdown between design fidelity and rendering performance?',
    topics: ['Product Design & UX', 'Technology'],
    createdAt: '3 days ago',
    views: 22100,
    followersCount: 880,
    isFollowing: true,
    isBookmarked: false,
    answers: [
      {
        id: 'ans_5_1',
        questionId: 'q_5',
        author: SEED_USERS[0], // Current User Alex Mercer
        createdAt: '2 days ago',
        upvotes: 1120,
        isUpvoted: true,
        comments: [
          {
            id: 'c_5_1_1',
            answerId: 'ans_5_1',
            author: SEED_USERS[2], // Marcus
            content: 'The point about synchronous layout recalculations inside scroll and drag handlers is where 90% of frame drops occur. Great breakdown Alex!',
            createdAt: '1 day ago',
            upvotes: 38,
            isUpvoted: true,
          },
        ],
        content: `The issue is rarely raw CPU compute; it is **uncontrolled JavaScript execution locking the browser main thread**.

Browsers have a strict 16.6ms budget to maintain 60 frames per second (or 8.3ms for 120Hz displays). If any script block blocks the event loop for longer than 20ms, it is perceived as human-detectable latency.

Here are the four primary culprits:

1. Forced Synchronous Layout Thrashing
Accessing properties like ` + '`offsetWidth`' + `, ` + '`scrollTop`' + `, or ` + '`getBoundingClientRect()`' + ` immediately after modifying styles forces the rendering engine to recalculate geometry synchronously instead of batching it cleanly during the render phase.

2. Giant Component Re-render Cascades
A keystroke inside an input triggering a state update at the root provider causes 400 child components to re-execute their render functions. State must be localized or decoupled using fine-grained reactivity.

3. Compositor Violations
Animating ` + '`width`' + `, ` + '`height`' + `, ` + '`left`' + `, or ` + '`margin`' + ` triggers full paint and layout passes. Only two CSS properties are guaranteed to run directly on the GPU compositor without triggering reflow:
- ` + '`transform`' + `
- ` + '`opacity`' + `

4. Unnecessary Third-Party Telemetry SDKs
The average commercial landing page loads 18 tracking scripts, session replay recorders, and analytics beacons that greedily monkey-patch ` + '`addEventListener`' + `.

Design with zero-latency input feedback, offload heavy work to Web Workers, and keep your DOM trees shallow.`,
      },
    ],
  },
];

export const SEED_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif_1',
    type: 'upvote',
    actor: SEED_USERS[2], // Marcus Vance
    questionTitle: 'Why do most modern web applications feel sluggish even on 12-core workstations...',
    questionId: 'q_5',
    answerId: 'ans_5_1',
    createdAt: '25 mins ago',
    isRead: false,
  },
  {
    id: 'notif_2',
    type: 'comment',
    actor: SEED_USERS[1], // Elena Rostova
    questionTitle: 'Why does caffeine stop working for focus after long consecutive days...',
    questionId: 'q_1',
    answerId: 'ans_1_1',
    createdAt: '45 mins ago',
    isRead: false,
  },
  {
    id: 'notif_3',
    type: 'answer',
    actor: SEED_USERS[2], // Marcus Vance
    questionTitle: 'What architectural shifts will replace traditional microservices in modern high-throughput SaaS by 2027?',
    questionId: 'q_2',
    answerId: 'ans_2_1',
    createdAt: '3 hours ago',
    isRead: true,
  },
  {
    id: 'notif_4',
    type: 'follow',
    actor: SEED_USERS[3], // Priya Nair
    createdAt: '1 day ago',
    isRead: true,
  },
];
