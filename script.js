// Global variables and state management
let currentSection = "home"
let currentQuizQuestion = 0
let quizAnswers = []
let doshaScores = { vata: 0, pitta: 0, kapha: 0 }
let searchSuggestions = []
let currentTheme = "light"
let isVoiceSearchActive = false
const bookmarkedRemedies = JSON.parse(localStorage.getItem("bookmarkedRemedies") || "[]")

// Comprehensive disease database
const diseases = [
  {
    name: "Cold",
    aliases: ["common cold", "cough", "flu", "fever", "runny nose", "congestion"],
    category: "respiratory",
    severity: "mild",
    treatmentTime: "short",
    description:
      "A viral infection affecting the upper respiratory tract, causing congestion, runny nose, cough, and general discomfort.",
    remedies: [
      "Tulsi (Holy Basil) tea - Boil 10-15 fresh tulsi leaves in water, add honey and drink 2-3 times daily",
      "Ginger honey kadha - Boil 1 inch ginger in 2 cups water, add honey and lemon juice when warm",
      "Steam inhalation with eucalyptus oil or ajwain (carom seeds) for 10-15 minutes twice daily",
      "Turmeric milk - Add 1 tsp turmeric powder to warm milk before bed for anti-inflammatory benefits",
      "Garlic and honey mixture - Crush 2-3 garlic cloves, mix with honey, take twice daily",
      "Black pepper and honey - Mix crushed black pepper with honey for throat relief",
      "Warm salt water gargling - Mix 1 tsp salt in warm water, gargle 3-4 times daily",
    ],
    medicines: [
      "Dabur Honitus Cough Syrup - Natural cough suppressant with honey and herbs",
      "Zandu Balm for chest congestion - Apply on chest and back for relief",
      "Himalaya Koflet Lozenges - Herbal throat lozenges for cough relief",
      "Baidyanath Sitopaladi Churna - Traditional powder for respiratory health",
      "Patanjali Divya Swasari Vati - Ayurvedic tablets for breathing issues",
      "Hamdard Joshina Syrup - Unani medicine for cold and cough",
    ],
    exercises: [
      "Light Pranayama (breathing exercises) - Anulom Vilom for 10 minutes daily",
      "Gentle yoga poses - Cat-cow stretch, child's pose for chest opening",
      "Kapalbhati breathing (only if no fever) - 50-100 breaths in morning",
      "Light walking in fresh air (avoid if fever is present) - 15-20 minutes",
      "Neck and shoulder rolls to relieve tension - 5 minutes every 2 hours",
      "Bhramari pranayama for nasal congestion - 10 rounds twice daily",
    ],
    diet: [
      "Warm soups - vegetable broth, chicken soup, dal soup with ginger and turmeric",
      "Herbal teas - ginger tea, tulsi tea, green tea with honey throughout the day",
      "Warm water with lemon and honey - First thing in morning and before bed",
      "Light, easily digestible foods - khichdi, porridge, steamed vegetables",
      "Avoid cold foods, ice cream, cold drinks, and dairy products during illness",
      "Include vitamin C rich foods - amla, oranges, lemon, guava",
      "Spicy foods in moderation - black pepper, ginger to clear congestion",
    ],
    lifestyle: [
      "Get adequate rest and sleep (8-9 hours) - Sleep is crucial for immune recovery",
      "Stay hydrated - drink warm fluids frequently, aim for 10-12 glasses daily",
      "Avoid exposure to cold air and sudden temperature changes",
      "Maintain good hygiene - wash hands frequently with soap for 20 seconds",
      "Use a humidifier or keep a bowl of water in the room for moisture",
      "Gargle with warm salt water 2-3 times daily to prevent throat infection",
      "Avoid smoking and alcohol which can worsen symptoms",
    ],
    precautions: [
      "Consult a doctor if fever persists for more than 3 days or exceeds 102°F",
      "Seek medical help if breathing difficulties, chest pain, or severe headache occurs",
      "Avoid antibiotics unless prescribed by a doctor - they don't work on viruses",
      "Don't suppress cough completely as it helps clear mucus from respiratory tract",
      "Pregnant women should consult healthcare provider before taking herbal remedies",
      "Children under 2 years should not be given honey-based remedies",
    ],
  },
  {
    name: "Acidity",
    aliases: ["acid reflux", "heartburn", "gastritis", "hyperacidity", "GERD", "stomach burn"],
    category: "digestive",
    severity: "mild",
    treatmentTime: "immediate",
    description:
      "Excessive acid production in the stomach causing burning sensation, discomfort, and digestive issues.",
    remedies: [
      "Jeera (cumin) water - Soak 1 tsp cumin seeds overnight, drink in morning on empty stomach",
      "Fresh amla juice - 1 tablespoon mixed with water on empty stomach daily",
      "Coconut water - Natural coolant, drink 2-3 glasses daily between meals",
      "Fennel seeds - Chew 1 tsp after meals or make fennel tea by boiling in water",
      "Aloe vera juice - 2 tablespoons before meals (ensure it's food-grade aloe)",
      "Cold milk - Provides immediate relief from burning sensation, drink slowly",
      "Banana - Eat 1-2 ripe bananas daily as they neutralize stomach acid naturally",
    ],
    medicines: [
      "Baidyanath Avipattikar Churna - 1 tsp with water after meals for digestion",
      "Himalaya Gasex Tablets - Natural antacid with herbs like Triphala",
      "Dabur Hajmola Regular - Digestive tablets with traditional spices",
      "Patanjali Divya Udarkalp Churna - Ayurvedic powder for stomach disorders",
      "Zandu Pancharishta - Liquid digestive tonic with five herbs",
      "Hamdard Jawarish Amla - Unani medicine for acidity and digestion",
    ],
    exercises: [
      "Vajrasana (Diamond pose) - Sit for 10-15 minutes after meals to aid digestion",
      "Pawanmuktasana (Wind-relieving pose) - Helps release trapped gas",
      "Light walking after meals - 10-15 minutes gentle walk, not vigorous exercise",
      "Pranayama - Sheetali and Sheetkari breathing for cooling effect",
      "Avoid vigorous exercise immediately after eating - wait at least 2 hours",
      "Supta Matsyendrasana (Supine spinal twist) - Gentle twisting for digestion",
    ],
    diet: [
      "Eat smaller, frequent meals instead of large portions - 5-6 small meals daily",
      "Include cooling foods - cucumber, watermelon, buttermilk, mint",
      "Avoid spicy, oily, and fried foods - they increase acid production",
      "Limit citrus fruits, tomatoes, and onions - they can trigger acidity",
      "Drink water 30 minutes before or after meals, not during eating",
      "Include alkaline foods - bananas, melons, green vegetables, almonds",
      "Avoid caffeine, alcohol, and carbonated drinks - they worsen acidity",
    ],
    lifestyle: [
      "Eat meals at regular times - maintain consistent eating schedule",
      "Avoid lying down immediately after eating - wait at least 2-3 hours",
      "Manage stress through meditation and relaxation - stress increases acid production",
      "Quit smoking and limit alcohol consumption - both increase stomach acid",
      "Wear loose-fitting clothes around the waist - tight clothes increase pressure",
      "Sleep with head slightly elevated - use extra pillow to prevent nighttime reflux",
      "Chew food thoroughly and eat slowly - proper chewing aids digestion",
    ],
    precautions: [
      "Consult doctor if symptoms persist for more than 2 weeks despite home remedies",
      "Seek immediate help for severe chest pain that could indicate heart problems",
      "Avoid self-medication with antacids for extended periods - can cause dependency",
      "Monitor for signs of ulcers - severe pain, black stools, or vomiting blood",
      "Pregnant women should consult healthcare provider before taking herbal remedies",
      "Don't ignore persistent symptoms - chronic acidity can lead to serious complications",
    ],
  },
  {
    name: "Headache",
    aliases: ["migraine", "tension headache", "cluster headache", "head pain", "cephalgia"],
    category: "mental",
    severity: "moderate",
    treatmentTime: "immediate",
    description:
      "Pain in the head or neck region, often caused by stress, tension, dehydration, or underlying health conditions.",
    remedies: [
      "Peppermint oil massage - Dilute with carrier oil, apply to temples and forehead gently",
      "Ginger tea - Fresh ginger boiled in water with honey, drink 2-3 times daily",
      "Cold compress - Apply ice pack wrapped in cloth for 15 minutes on forehead",
      "Lavender oil inhalation - Add few drops to hot water and inhale steam",
      "Cinnamon paste - Mix cinnamon powder with water, apply to forehead for 30 minutes",
      "Clove oil - Dilute and apply to temples gently, has natural pain-relieving properties",
      "Apple cider vinegar - 1 tbsp in glass of water, drink slowly for relief",
    ],
    medicines: [
      "Himalaya Speman (for stress-related headaches) - Herbal stress reliever",
      "Baidyanath Saraswatarishta - Ayurvedic brain tonic for mental fatigue",
      "Dabur Brahmi Vati - Traditional medicine for neurological health",
      "Patanjali Divya Medha Vati - Herbal tablets for mental clarity and headache",
      "Zandu Brento Syrup - Liquid brain tonic with herbs like Brahmi",
      "Hamdard Khamira Gaozaban - Unani medicine for brain and nervous system",
    ],
    exercises: [
      "Neck and shoulder stretches - Gentle rotations and stretches every hour",
      "Pranayama - Deep breathing exercises for 10 minutes to reduce stress",
      "Shavasana (Corpse pose) - Complete relaxation for 15 minutes in quiet room",
      "Light yoga - Cat-cow pose, child's pose for tension relief",
      "Eye exercises - Palming and gentle eye movements to reduce eye strain",
      "Progressive muscle relaxation - Tense and release muscle groups systematically",
      "Walking meditation - Slow, mindful walking in nature for 20 minutes",
    ],
    diet: [
      "Stay hydrated - Drink 8-10 glasses of water daily, dehydration causes headaches",
      "Avoid trigger foods - chocolate, aged cheese, processed meats, MSG",
      "Include magnesium-rich foods - nuts, seeds, leafy greens, whole grains",
      "Regular meal times - Don't skip meals, low blood sugar triggers headaches",
      "Limit caffeine and alcohol intake - both can cause rebound headaches",
      "Include omega-3 rich foods - fish, walnuts, flaxseeds for brain health",
      "Fresh fruits and vegetables - especially those high in water content",
    ],
    lifestyle: [
      "Maintain regular sleep schedule - 7-8 hours nightly, go to bed same time",
      "Manage stress through meditation and relaxation techniques daily",
      "Take regular breaks from screen time - follow 20-20-20 rule",
      "Ensure proper lighting while reading or working - avoid dim or harsh lights",
      "Practice good posture, especially while working at computer",
      "Keep a headache diary to identify triggers - note food, sleep, stress patterns",
      "Create a calm, quiet environment during headache episodes",
    ],
    precautions: [
      "Seek immediate medical help for sudden, severe headaches unlike any before",
      "Consult doctor for headaches with fever, stiff neck, vision changes, or confusion",
      "Don't overuse pain medications - can cause medication overuse headaches",
      "Be aware of warning signs - aura, visual disturbances may indicate migraine",
      "Pregnant women should consult before taking any medication or strong herbs",
      "Monitor frequency and intensity - increasing headaches need medical evaluation",
    ],
  },
  {
    name: "Joint Pain",
    aliases: ["arthritis", "knee pain", "back pain", "muscle pain", "rheumatism", "joint stiffness"],
    category: "joint",
    severity: "moderate",
    treatmentTime: "medium",
    description:
      "Discomfort, aches, and soreness in joints, often due to inflammation, wear and tear, or underlying conditions.",
    remedies: [
      "Turmeric paste - Mix turmeric with warm mustard oil, apply externally for 30 minutes",
      "Ginger compress - Grate fresh ginger, wrap in cloth, apply warm for 20 minutes",
      "Sesame oil massage - Warm sesame oil massage before bath, improves circulation",
      "Fenugreek seeds - Soak overnight, eat in morning or make paste for external use",
      "Garlic oil - Heat garlic in sesame oil, cool and use for massage twice daily",
      "Eucalyptus oil - Mix with carrier oil for topical application, has anti-inflammatory properties",
      "Hot and cold therapy - Alternate hot and cold packs for 15 minutes each",
    ],
    medicines: [
      "Baidyanath Yograj Guggulu - Traditional tablets for joint and muscle health",
      "Himalaya Rumalaya Forte Tablets - Herbal anti-inflammatory for joint pain",
      "Dabur Rheumatil Oil and Tablets - Complete joint care system",
      "Patanjali Divya Peedantak Oil - Ayurvedic oil for pain relief",
      "Zandu Ortho Vedic Oil - Herbal oil blend for joint and muscle pain",
      "Hamdard Majun Suranjan - Unani medicine for arthritis and joint disorders",
    ],
    exercises: [
      "Gentle yoga - Sukhasana, Marjariasana (Cat pose), avoid intense poses",
      "Swimming or water exercises - Low impact on joints, excellent for mobility",
      "Walking - Start with 15-20 minutes daily, gradually increase duration",
      "Range of motion exercises - Gentle joint movements in all directions",
      "Strengthening exercises - Light weights or resistance bands for muscle support",
      "Tai Chi - Gentle, flowing movements that improve balance and flexibility",
      "Stretching routine - Hold stretches for 30 seconds, do twice daily",
    ],
    diet: [
      "Anti-inflammatory foods - turmeric, ginger, garlic in daily cooking",
      "Omega-3 rich foods - fish, walnuts, flaxseeds, chia seeds",
      "Antioxidant-rich fruits - berries, cherries, oranges, pomegranates",
      "Avoid processed foods, excess sugar, and trans fats - increase inflammation",
      "Include calcium-rich foods - dairy, leafy greens, sesame seeds, almonds",
      "Stay hydrated to maintain joint lubrication - 8-10 glasses water daily",
      "Green tea - Contains compounds that may reduce joint inflammation",
    ],
    lifestyle: [
      "Maintain healthy weight to reduce joint stress - every pound lost reduces knee stress by 4 pounds",
      "Use proper ergonomics at work and home - supportive chairs, proper desk height",
      "Apply heat or cold therapy as needed - heat for stiffness, cold for inflammation",
      "Get adequate sleep for tissue repair - 7-8 hours quality sleep nightly",
      "Avoid prolonged sitting or standing - change positions every 30 minutes",
      "Use supportive shoes and consider orthotics if needed for proper alignment",
      "Practice stress management - chronic stress can worsen inflammation",
    ],
    precautions: [
      "Consult doctor for persistent or severe joint pain lasting more than few days",
      "Don't ignore signs of infection - redness, warmth, fever around joints",
      "Avoid high-impact activities during flare-ups - can worsen joint damage",
      "Be cautious with herbal remedies if taking blood thinners - may interact",
      "Monitor for side effects of long-term medication use - regular check-ups needed",
      "Seek immediate help for sudden, severe joint pain with inability to move",
    ],
  },
  {
    name: "Insomnia",
    aliases: ["sleeplessness", "sleep disorder", "sleep problems", "sleep deprivation", "sleep disturbance"],
    category: "mental",
    severity: "moderate",
    treatmentTime: "medium",
    description:
      "Difficulty falling asleep, staying asleep, or getting quality sleep, leading to daytime fatigue and impaired functioning.",
    remedies: [
      "Warm milk with nutmeg - Add pinch of nutmeg powder to warm milk before bed",
      "Chamomile tea - Drink 30 minutes before bedtime for natural sedative effect",
      "Lavender oil - Few drops on pillow or diffuse in bedroom for relaxation",
      "Ashwagandha powder - 1 tsp with warm milk before bed, reduces stress hormones",
      "Brahmi oil massage - Gentle scalp massage before sleep improves circulation",
      "Valerian root tea - Natural sleep inducer, steep 1 tsp in hot water",
      "Tart cherry juice - Contains natural melatonin, drink 1 hour before bed",
    ],
    medicines: [
      "Baidyanath Saraswatarishta - Ayurvedic brain tonic for mental calmness",
      "Himalaya Tagara Sleep Wellness - Herbal tablets for natural sleep",
      "Dabur Brahmi Vati Gold - Traditional medicine for nervous system",
      "Patanjali Divya Medha Vati - Herbal tablets for mental peace and sleep",
      "Zandu Brento Syrup - Liquid brain tonic with sleep-promoting herbs",
      "Hamdard Khamira Gaozaban - Unani medicine for brain and sleep disorders",
    ],
    exercises: [
      "Gentle yoga before bed - Child's pose, legs up the wall pose",
      "Pranayama - 4-7-8 breathing technique: inhale 4, hold 7, exhale 8",
      "Progressive muscle relaxation - Tense and release each muscle group",
      "Light stretching - Neck, shoulders, and back stretches for 10 minutes",
      "Meditation - 10-15 minutes mindfulness or guided meditation before sleep",
      "Avoid vigorous exercise 3 hours before bedtime - can be too stimulating",
      "Yoga Nidra - Guided body scan meditation for deep relaxation",
    ],
    diet: [
      "Light dinner 2-3 hours before sleep - heavy meals disrupt sleep",
      "Avoid caffeine after 2 PM - stays in system 6-8 hours",
      "Include tryptophan-rich foods - turkey, milk, bananas, oats",
      "Herbal teas - chamomile, passionflower, lemon balm before bed",
      "Avoid heavy, spicy, or acidic foods before bed - can cause discomfort",
      "Limit alcohol consumption, especially in evening - disrupts sleep cycles",
      "Small bedtime snack if hungry - banana with almond butter",
    ],
    lifestyle: [
      "Maintain consistent sleep schedule - same bedtime and wake time daily",
      "Create relaxing bedtime routine - dim lights, calm activities 1 hour before bed",
      "Keep bedroom cool, dark, and quiet - ideal temperature 65-68°F",
      "Limit screen time 1 hour before bed - blue light disrupts melatonin",
      "Use comfortable mattress and pillows - replace every 7-10 years",
      "Manage stress through relaxation techniques - journaling, deep breathing",
      "Get morning sunlight exposure - helps regulate circadian rhythm",
    ],
    precautions: [
      "Consult doctor if insomnia persists for more than 2 weeks despite lifestyle changes",
      "Don't rely on sleep medications long-term without medical supervision",
      "Be aware of underlying conditions causing sleep issues - sleep apnea, anxiety",
      "Avoid driving when severely sleep-deprived - impairs reaction time",
      "Monitor for signs of sleep disorders - loud snoring, gasping during sleep",
      "Don't use alcohol as sleep aid - worsens sleep quality long-term",
    ],
  },
  {
    name: "Diabetes",
    aliases: ["blood sugar", "high glucose", "diabetes mellitus", "hyperglycemia", "sugar disease"],
    category: "metabolic",
    severity: "severe",
    treatmentTime: "long",
    description:
      "A metabolic disorder characterized by high blood sugar levels due to insufficient insulin production or insulin resistance.",
    remedies: [
      "Bitter gourd juice - Fresh juice on empty stomach, 30ml daily",
      "Fenugreek seeds - Soak 1 tbsp overnight, eat in morning with water",
      "Cinnamon powder - 1 tsp with warm water daily, helps insulin sensitivity",
      "Amla juice - Rich in vitamin C, helps regulate blood sugar, 30ml daily",
      "Neem leaves - Chew 4-5 fresh leaves daily on empty stomach",
      "Jamun seeds powder - 1 tsp with water twice daily after meals",
      "Gymnema sylvestre - 'Sugar destroyer' herb, consult practitioner for dosage",
    ],
    medicines: [
      "Baidyanath Madhumehari Granules - Ayurvedic diabetes management",
      "Himalaya Diabecon Tablets - Herbal blood sugar support",
      "Dabur Madhurakshak Churna - Traditional powder for diabetes",
      "Patanjali Divya Madhunashini Vati - Herbal tablets for blood sugar control",
      "Zandu Diabinese Tablets - Ayurvedic diabetes management tablets",
      "Hamdard Qurs Tabasheer - Unani medicine for diabetes and related issues",
    ],
    exercises: [
      "Brisk walking - 30-45 minutes daily, best exercise for blood sugar control",
      "Yoga asanas - Dhanurasana, Halasana, Paschimottanasana for pancreatic health",
      "Swimming - Excellent full-body exercise, low impact on joints",
      "Cycling - Low impact cardio exercise, 30 minutes daily",
      "Pranayama - Kapalbhati, Anulom Vilom for stress reduction and circulation",
      "Strength training - 2-3 times per week to improve insulin sensitivity",
      "Surya Namaskara - Complete body workout, 12 rounds daily",
    ],
    diet: [
      "Low glycemic index foods - whole grains, legumes, vegetables",
      "High fiber foods - vegetables, fruits with skin, whole grains",
      "Portion control - Use smaller plates, measure servings, eat slowly",
      "Avoid refined sugars, white bread, processed foods - cause blood sugar spikes",
      "Include protein with each meal - lean meats, legumes, nuts",
      "Regular meal timing - Don't skip meals, eat every 3-4 hours",
      "Complex carbohydrates - brown rice, quinoa, oats instead of simple carbs",
    ],
    lifestyle: [
      "Monitor blood sugar levels regularly - as advised by healthcare provider",
      "Maintain healthy weight - even 5-10% weight loss improves blood sugar",
      "Manage stress through meditation and relaxation - stress raises blood sugar",
      "Get adequate sleep - 7-8 hours nightly, poor sleep affects blood sugar",
      "Stay hydrated - Drink plenty of water, avoid sugary drinks",
      "Regular medical check-ups and eye exams - prevent complications",
      "Foot care - Daily inspection, proper hygiene, comfortable shoes",
    ],
    precautions: [
      "Never stop prescribed medications without doctor consultation",
      "Monitor for signs of hypoglycemia - shakiness, sweating, confusion",
      "Regular foot care and inspection - diabetes affects circulation",
      "Be cautious with herbal remedies - may interact with diabetes medications",
      "Carry glucose tablets or snacks for emergencies - treat low blood sugar quickly",
      "Inform all healthcare providers about diabetes and medications taken",
      "Learn to recognize signs of diabetic ketoacidosis - seek immediate help",
    ],
  },
  {
    name: "Hypertension",
    aliases: ["high blood pressure", "high bp", "blood pressure", "hypertensive", "elevated bp"],
    category: "metabolic",
    severity: "severe",
    treatmentTime: "long",
    description:
      "A condition where blood pressure in the arteries is persistently elevated, increasing risk of heart disease and stroke.",
    remedies: [
      "Garlic - 2-3 cloves daily or garlic supplements, natural ACE inhibitor",
      "Hibiscus tea - 2-3 cups daily, contains compounds that lower BP",
      "Beetroot juice - Fresh juice daily, nitrates help dilate blood vessels",
      "Lemon water - Warm water with lemon juice in morning, vitamin C benefits",
      "Watermelon seeds - Dried and powdered, 1 tsp daily with water",
      "Celery juice - Fresh celery juice daily, contains phthalides that relax arteries",
      "Pomegranate juice - Rich in antioxidants, 1 cup daily",
    ],
    medicines: [
      "Baidyanath Arjunarishta - Ayurvedic heart tonic with Arjuna bark",
      "Himalaya Arjuna Tablets - Standardized Arjuna extract for heart health",
      "Dabur Cardostab Tablets - Herbal heart support formula",
      "Patanjali Divya Hridyamrit Vati - Ayurvedic tablets for heart and BP",
      "Zandu Arjun Chhal Churna - Arjuna bark powder for cardiovascular health",
      "Hamdard Qurs Deedan - Unani medicine for heart and blood pressure",
    ],
    exercises: [
      "Regular aerobic exercise - 30 minutes, 5 days a week, walking, cycling",
      "Yoga - Shavasana, Sukhasana, gentle poses, avoid inversions",
      "Pranayama - Anulom Vilom, Bhramari for stress reduction",
      "Walking - Brisk walking daily, gradually increase pace and duration",
      "Swimming - Low impact, full body exercise, excellent for heart health",
      "Avoid isometric exercises and heavy weight lifting - can spike BP",
      "Meditation - 20 minutes daily to reduce stress and lower BP",
    ],
    diet: [
      "DASH diet - Rich in fruits, vegetables, whole grains, lean proteins",
      "Reduce sodium intake - Limit processed and packaged foods, use herbs for flavor",
      "Increase potassium - Bananas, oranges, spinach, sweet potatoes",
      "Limit alcohol consumption - No more than 1 drink daily for women, 2 for men",
      "Reduce saturated fats and cholesterol - Choose lean meats, low-fat dairy",
      "Include omega-3 rich foods - fish, walnuts, flaxseeds for heart health",
      "Dark chocolate in moderation - Contains flavonoids that may lower BP",
    ],
    lifestyle: [
      "Maintain healthy weight - Even small weight loss can significantly lower BP",
      "Manage stress through meditation and relaxation - chronic stress raises BP",
      "Quit smoking completely - Smoking damages blood vessels and raises BP",
      "Limit alcohol consumption - Excessive alcohol raises blood pressure",
      "Get adequate sleep - 7-8 hours, poor sleep linked to high BP",
      "Monitor blood pressure regularly at home - keep log for doctor",
      "Practice deep breathing exercises - 5 minutes several times daily",
    ],
    precautions: [
      "Take prescribed medications consistently - Don't skip doses",
      "Regular monitoring of blood pressure - Home monitoring plus doctor visits",
      "Don't stop medications abruptly - Can cause dangerous BP spikes",
      "Be aware of drug interactions with herbal remedies - Consult doctor",
      "Seek immediate help for severe headache, chest pain, or vision changes",
      "Regular check-ups with healthcare provider - Monitor for complications",
      "Learn to recognize hypertensive crisis symptoms - Call emergency if BP >180/120",
    ],
  },
  {
    name: "Constipation",
    aliases: ["irregular bowel movement", "hard stool", "digestive problem", "bowel irregularity"],
    category: "digestive",
    severity: "mild",
    treatmentTime: "short",
    description: "Difficulty in passing stools or infrequent bowel movements, often accompanied by hard, dry stools.",
    remedies: [
      "Triphala churna - 1 tsp with warm water before bed, gentle natural laxative",
      "Psyllium husk (Isabgol) - 1 tsp with water twice daily, adds bulk to stool",
      "Warm water with lemon - First thing in morning stimulates bowel movement",
      "Castor oil - 1 tsp before bed occasionally, strong laxative effect",
      "Prunes - Soak 3-4 overnight, eat in morning with soaking water",
      "Flaxseeds - Ground flaxseeds with water, rich in fiber and omega-3",
      "Aloe vera juice - 2 tbsp in morning, has mild laxative properties",
    ],
    medicines: [
      "Baidyanath Kabj Hari Churna - Traditional Ayurvedic powder for constipation",
      "Himalaya Herbolax Tablets - Gentle herbal laxative tablets",
      "Dabur Hajmola Fizzy - Digestive tablets with natural ingredients",
      "Patanjali Divya Udarkalp Churna - Ayurvedic powder for digestive health",
      "Zandu Pancharishta - Liquid digestive tonic for bowel regularity",
      "Hamdard Jawarish Jalinus - Unani medicine for digestive disorders",
    ],
    exercises: [
      "Pawanmuktasana - Wind-relieving pose, lie on back, hug knees to chest",
      "Malasana - Deep squat pose, natural position for bowel movements",
      "Walking - 20-30 minutes daily, stimulates intestinal movement",
      "Abdominal massage - Clockwise circular motions for 5 minutes",
      "Pranayama - Kapalbhati breathing stimulates digestive organs",
      "Twisting poses - Bharadvajasana, seated spinal twist for digestion",
      "Cat-cow pose - On hands and knees, arch and round spine alternately",
    ],
    diet: [
      "High fiber foods - Fruits, vegetables, whole grains, legumes daily",
      "Plenty of water - 8-10 glasses daily, essential for soft stools",
      "Probiotic foods - Yogurt, kefir, fermented foods for gut health",
      "Avoid processed and refined foods - Low in fiber, worsen constipation",
      "Include healthy fats - Olive oil, avocados help lubricate intestines",
      "Regular meal times and adequate portions - Don't skip meals",
      "Warm liquids - Herbal teas, warm water stimulate bowel movements",
    ],
    lifestyle: [
      "Establish regular toilet routine - Same time daily, preferably after meals",
      "Don't delay urge to defecate - Respond to body's natural signals",
      "Proper toilet posture - Use footstool if needed, knees higher than hips",
      "Manage stress levels - Stress can worsen digestive issues",
      "Get adequate physical activity - Sedentary lifestyle worsens constipation",
      "Avoid excessive use of laxatives - Can create dependency",
      "Create relaxed bathroom environment - No rushing, allow adequate time",
    ],
    precautions: [
      "Consult doctor if constipation persists for more than 2 weeks",
      "Seek help for severe abdominal pain, bleeding, or sudden change in bowel habits",
      "Don't use stimulant laxatives regularly - Can damage intestinal muscles",
      "Be cautious with herbal remedies during pregnancy - Some may not be safe",
      "Monitor for signs of bowel obstruction - Severe pain, vomiting, no gas",
      "Increase fiber intake gradually - Sudden increase can cause gas and bloating",
    ],
  },
  {
    name: "Anxiety",
    aliases: ["stress", "panic", "nervousness", "worry", "panic disorder", "generalized anxiety"],
    category: "mental",
    severity: "moderate",
    treatmentTime: "medium",
    description:
      "A mental health condition characterized by excessive worry, fear, and physical symptoms like rapid heartbeat and sweating.",
    remedies: [
      "Ashwagandha powder - 1 tsp with warm milk before bed, adaptogenic herb",
      "Brahmi oil massage - Gentle scalp massage improves circulation and calms mind",
      "Chamomile tea - 2-3 cups daily, natural anxiolytic properties",
      "Lavender oil - Aromatherapy or few drops on pillow for relaxation",
      "Jatamansi powder - 1/2 tsp with honey, traditional nerve tonic",
      "Shankhpushpi syrup - As directed, brain tonic and stress reliever",
      "Lemon balm tea - Natural sedative, drink 2-3 times daily",
    ],
    medicines: [
      "Baidyanath Saraswatarishta - Ayurvedic brain tonic for mental calmness",
      "Himalaya Mentat Tablets - Herbal brain tonic for cognitive function",
      "Dabur Brahmi Vati Gold - Traditional medicine for nervous system",
      "Patanjali Divya Medha Vati - Herbal tablets for mental peace and clarity",
      "Zandu Brento Syrup - Liquid brain tonic with stress-relieving herbs",
      "Hamdard Khamira Gaozaban - Unani medicine for brain and nervous system",
    ],
    exercises: [
      "Pranayama - Deep breathing exercises daily, 4-7-8 technique",
      "Yoga - Balasana, Shavasana, gentle poses for relaxation",
      "Meditation - 15-20 minutes daily, mindfulness or guided meditation",
      "Progressive muscle relaxation - Tense and release muscle groups",
      "Light aerobic exercise - Walking, swimming for endorphin release",
      "Tai Chi or Qigong - Gentle, mindful movements for stress relief",
      "Yoga Nidra - Deep relaxation technique for anxiety management",
    ],
    diet: [
      "Avoid caffeine and stimulants - Can worsen anxiety symptoms",
      "Include magnesium-rich foods - Nuts, seeds, leafy greens, dark chocolate",
      "Omega-3 fatty acids - Fish, walnuts, flaxseeds for brain health",
      "Complex carbohydrates - Whole grains, legumes for stable blood sugar",
      "Limit sugar and processed foods - Can cause mood swings",
      "Stay hydrated and eat regular meals - Dehydration and hunger worsen anxiety",
      "Herbal teas - Chamomile, passionflower, lemon balm for calming effect",
    ],
    lifestyle: [
      "Practice stress management techniques - Deep breathing, meditation daily",
      "Maintain regular sleep schedule - 7-8 hours quality sleep nightly",
      "Limit alcohol and avoid recreational drugs - Can worsen anxiety long-term",
      "Connect with supportive friends and family - Social support is crucial",
      "Engage in hobbies and enjoyable activities - Distraction and pleasure",
      "Consider counseling or therapy if needed - Professional help is valuable",
      "Create calm environment - Reduce clutter, use soothing colors and scents",
    ],
    precautions: [
      "Seek professional help for severe or persistent anxiety affecting daily life",
      "Don't stop prescribed medications without medical supervision",
      "Be aware of panic attack symptoms - Chest pain, shortness of breath",
      "Avoid self-medication with alcohol or drugs - Worsens anxiety long-term",
      "Monitor for signs of depression or suicidal thoughts - Seek immediate help",
      "Learn to recognize anxiety triggers - Avoid or manage them effectively",
    ],
  },
  {
    name: "Skin Problems",
    aliases: ["acne", "eczema", "rash", "skin irritation", "pimples", "dermatitis", "skin allergy"],
    category: "skin",
    severity: "mild",
    treatmentTime: "medium",
    description: "Various skin conditions including acne, eczema, rashes, and other inflammatory skin disorders.",
    remedies: [
      "Neem paste - Fresh neem leaves ground with water, natural antibacterial",
      "Turmeric face mask - Turmeric with rose water or milk, anti-inflammatory",
      "Aloe vera gel - Fresh gel applied directly, soothes and heals skin",
      "Tea tree oil - Diluted with carrier oil for spot treatment, antimicrobial",
      "Cucumber slices - For cooling and soothing effect, reduces inflammation",
      "Oatmeal scrub - Ground oats with honey and water, gentle exfoliation",
      "Rose water - Natural toner, spray or apply with cotton pad",
    ],
    medicines: [
      "Himalaya Neem Tablets - Internal blood purification for skin health",
      "Baidyanath Mahamanjisthadi Kwath - Ayurvedic blood purifier for skin",
      "Dabur Neem Oil - External application for skin infections",
      "Patanjali Divya Kayakalp Vati - Herbal tablets for skin disorders",
      "Zandu Purifying Blood Syrup - Liquid blood purifier for clear skin",
      "Hamdard Majun Salab - Unani medicine for skin and general health",
    ],
    exercises: [
      "Regular exercise to improve circulation - Increases oxygen to skin cells",
      "Yoga for stress reduction - Major cause of skin problems, practice daily",
      "Pranayama - Helps detoxify through better oxygenation",
      "Avoid excessive sweating without proper cleansing - Can clog pores",
      "Gentle stretching and relaxation exercises - Reduce stress-related skin issues",
      "Facial yoga - Gentle exercises to improve facial circulation",
      "Walking in fresh air - Vitamin D from sunlight benefits skin",
    ],
    diet: [
      "Antioxidant-rich foods - Berries, green tea, dark leafy greens",
      "Omega-3 fatty acids - Fish, walnuts, flaxseeds for skin health",
      "Zinc-rich foods - Pumpkin seeds, chickpeas, cashews for healing",
      "Avoid dairy and high-glycemic foods if acne-prone - Can trigger breakouts",
      "Stay hydrated - 8-10 glasses of water daily for skin hydration",
      "Limit processed foods, sugar, and fried foods - Increase inflammation",
      "Include vitamin C foods - Citrus fruits, bell peppers for collagen",
    ],
    lifestyle: [
      "Gentle skincare routine - Avoid harsh scrubbing, use mild cleansers",
      "Use non-comedogenic products - Won't clog pores",
      "Protect skin from sun exposure - Use sunscreen, wear protective clothing",
      "Change pillowcases regularly - Reduce bacteria transfer to face",
      "Avoid touching face frequently - Transfers bacteria and oils",
      "Manage stress levels effectively - Stress hormones worsen skin conditions",
      "Get adequate sleep - Skin repairs itself during sleep",
    ],
    precautions: [
      "Patch test new topical treatments - Apply small amount first",
      "Consult dermatologist for persistent or severe conditions",
      "Avoid picking or squeezing pimples - Can cause scarring and infection",
      "Be cautious with essential oils - Always dilute, some can cause reactions",
      "Monitor for signs of infection or allergic reactions - Seek medical help",
      "Don't use too many products at once - Can irritate sensitive skin",
    ],
  },
]

// Dosha quiz questions
const doshaQuestions = [
  {
    question: "What is your body frame?",
    options: [
      { text: "Thin, light, small-boned", dosha: "vata", score: 3 },
      { text: "Medium, moderate build", dosha: "pitta", score: 3 },
      { text: "Large, heavy, big-boned", dosha: "kapha", score: 3 },
    ],
  },
  {
    question: "How is your skin generally?",
    options: [
      { text: "Dry, rough, thin", dosha: "vata", score: 3 },
      { text: "Warm, oily, prone to rashes", dosha: "pitta", score: 3 },
      { text: "Thick, moist, smooth", dosha: "kapha", score: 3 },
    ],
  },
  {
    question: "What describes your hair?",
    options: [
      { text: "Dry, brittle, thin", dosha: "vata", score: 3 },
      { text: "Fine, oily, early graying", dosha: "pitta", score: 3 },
      { text: "Thick, lustrous, wavy", dosha: "kapha", score: 3 },
    ],
  },
  {
    question: "How is your appetite?",
    options: [
      { text: "Variable, sometimes forget to eat", dosha: "vata", score: 3 },
      { text: "Strong, get irritable when hungry", dosha: "pitta", score: 3 },
      { text: "Steady, can skip meals easily", dosha: "kapha", score: 3 },
    ],
  },
  {
    question: "What is your sleep pattern?",
    options: [
      { text: "Light sleeper, difficulty falling asleep", dosha: "vata", score: 3 },
      { text: "Moderate sleep, wake up refreshed", dosha: "pitta", score: 3 },
      { text: "Deep sleeper, hard to wake up", dosha: "kapha", score: 3 },
    ],
  },
  {
    question: "How do you handle stress?",
    options: [
      { text: "Worry, anxiety, feel overwhelmed", dosha: "vata", score: 3 },
      { text: "Anger, irritation, become critical", dosha: "pitta", score: 3 },
      { text: "Withdraw, become lethargic", dosha: "kapha", score: 3 },
    ],
  },
  {
    question: "What is your energy level?",
    options: [
      { text: "Comes in bursts, then fatigue", dosha: "vata", score: 3 },
      { text: "Moderate, steady throughout day", dosha: "pitta", score: 3 },
      { text: "Steady, good endurance", dosha: "kapha", score: 3 },
    ],
  },
  {
    question: "How do you learn new things?",
    options: [
      { text: "Quick to learn, quick to forget", dosha: "vata", score: 3 },
      { text: "Moderate pace, good retention", dosha: "pitta", score: 3 },
      { text: "Slow to learn, excellent retention", dosha: "kapha", score: 3 },
    ],
  },
  {
    question: "What is your speaking style?",
    options: [
      { text: "Fast, talkative, enthusiastic", dosha: "vata", score: 3 },
      { text: "Sharp, precise, argumentative", dosha: "pitta", score: 3 },
      { text: "Slow, melodious, thoughtful", dosha: "kapha", score: 3 },
    ],
  },
  {
    question: "How do you make decisions?",
    options: [
      { text: "Quickly, then change mind often", dosha: "vata", score: 3 },
      { text: "Decisively, stick to decisions", dosha: "pitta", score: 3 },
      { text: "Slowly, after much deliberation", dosha: "kapha", score: 3 },
    ],
  },
  {
    question: "What weather do you prefer?",
    options: [
      { text: "Warm, humid weather", dosha: "vata", score: 3 },
      { text: "Cool, well-ventilated spaces", dosha: "pitta", score: 3 },
      { text: "Warm, dry weather", dosha: "kapha", score: 3 },
    ],
  },
  {
    question: "How is your digestion?",
    options: [
      { text: "Irregular, gas, bloating", dosha: "vata", score: 3 },
      { text: "Strong, rarely have problems", dosha: "pitta", score: 3 },
      { text: "Slow, feel heavy after eating", dosha: "kapha", score: 3 },
    ],
  },
  {
    question: "What describes your emotions?",
    options: [
      { text: "Enthusiastic, changeable, anxious", dosha: "vata", score: 3 },
      { text: "Intense, passionate, irritable", dosha: "pitta", score: 3 },
      { text: "Calm, steady, attached", dosha: "kapha", score: 3 },
    ],
  },
  {
    question: "How do you spend money?",
    options: [
      { text: "Impulsively, on small things", dosha: "vata", score: 3 },
      { text: "On luxury items, quality goods", dosha: "pitta", score: 3 },
      { text: "Carefully, save for big purchases", dosha: "kapha", score: 3 },
    ],
  },
  {
    question: "What is your walking pace?",
    options: [
      { text: "Fast, irregular steps", dosha: "vata", score: 3 },
      { text: "Moderate, purposeful", dosha: "pitta", score: 3 },
      { text: "Slow, steady, graceful", dosha: "kapha", score: 3 },
    ],
  },
]

// Herbs database
const herbs = [
  {
    name: "Ashwagandha",
    scientific: "Withania somnifera",
    icon: "🌿",
    category: "stress",
    description:
      "Known as Indian Winter Cherry, this adaptogenic herb helps the body manage stress and promotes overall vitality.",
    benefits: [
      "Reduces stress and anxiety",
      "Improves sleep quality",
      "Boosts immune system",
      "Enhances physical performance",
      "Supports thyroid function",
    ],
    tags: ["Adaptogen", "Stress Relief", "Sleep", "Immunity"],
  },
  {
    name: "Turmeric",
    scientific: "Curcuma longa",
    icon: "🟡",
    category: "immunity",
    description:
      "Golden spice with powerful anti-inflammatory and antioxidant properties, essential in Ayurvedic medicine.",
    benefits: [
      "Powerful anti-inflammatory",
      "Supports joint health",
      "Boosts immune system",
      "Aids digestion",
      "Promotes wound healing",
    ],
    tags: ["Anti-inflammatory", "Immunity", "Joints", "Digestion"],
  },
  {
    name: "Tulsi",
    scientific: "Ocimum sanctum",
    icon: "🍃",
    category: "respiratory",
    description:
      "Holy Basil is revered as a sacred plant with remarkable healing properties for respiratory and immune health.",
    benefits: [
      "Supports respiratory health",
      "Reduces stress and anxiety",
      "Boosts immunity",
      "Purifies blood",
      "Improves mental clarity",
    ],
    tags: ["Respiratory", "Immunity", "Stress Relief", "Sacred"],
  },
  {
    name: "Brahmi",
    scientific: "Bacopa monnieri",
    icon: "🧠",
    category: "stress",
    description: "Brain tonic herb that enhances cognitive function, memory, and mental clarity while reducing stress.",
    benefits: [
      "Enhances memory and learning",
      "Reduces anxiety and stress",
      "Improves concentration",
      "Supports nervous system",
      "Promotes mental clarity",
    ],
    tags: ["Brain Health", "Memory", "Stress Relief", "Cognitive"],
  },
  {
    name: "Neem",
    scientific: "Azadirachta indica",
    icon: "🌳",
    category: "skin",
    description: "Nature's pharmacy with powerful antibacterial, antifungal, and blood purifying properties.",
    benefits: [
      "Purifies blood",
      "Treats skin conditions",
      "Natural antibacterial",
      "Supports oral health",
      "Boosts immune system",
    ],
    tags: ["Blood Purifier", "Skin Care", "Antibacterial", "Immunity"],
  },
  {
    name: "Amla",
    scientific: "Phyllanthus emblica",
    icon: "🟢",
    category: "immunity",
    description: "Indian Gooseberry, richest natural source of Vitamin C, supports immunity and overall health.",
    benefits: [
      "Highest Vitamin C content",
      "Boosts immune system",
      "Supports hair and skin health",
      "Aids digestion",
      "Anti-aging properties",
    ],
    tags: ["Vitamin C", "Immunity", "Hair Care", "Anti-aging"],
  },
  {
    name: "Ginger",
    scientific: "Zingiber officinale",
    icon: "🫚",
    category: "digestion",
    description: "Universal medicine with warming properties, excellent for digestion, nausea, and inflammation.",
    benefits: [
      "Aids digestion",
      "Reduces nausea",
      "Anti-inflammatory",
      "Boosts circulation",
      "Supports respiratory health",
    ],
    tags: ["Digestion", "Anti-inflammatory", "Circulation", "Respiratory"],
  },
  {
    name: "Triphala",
    scientific: "Three fruits blend",
    icon: "🍇",
    category: "digestion",
    description: "Combination of three fruits that gently cleanses and detoxifies while supporting digestive health.",
    benefits: [
      "Gentle detoxification",
      "Supports digestion",
      "Rich in antioxidants",
      "Promotes regular bowel movements",
      "Supports eye health",
    ],
    tags: ["Detox", "Digestion", "Antioxidants", "Cleansing"],
  },
  {
    name: "Guduchi",
    scientific: "Tinospora cordifolia",
    icon: "🌿",
    category: "immunity",
    description: "Divine nectar plant with powerful immune-boosting and rejuvenating properties.",
    benefits: [
      "Powerful immune booster",
      "Supports liver health",
      "Anti-inflammatory",
      "Helps manage diabetes",
      "Reduces fever",
    ],
    tags: ["Immunity", "Liver Health", "Anti-inflammatory", "Diabetes"],
  },
  {
    name: "Arjuna",
    scientific: "Terminalia arjuna",
    icon: "❤️",
    category: "immunity",
    description: "Heart tonic bark that supports cardiovascular health and strengthens the heart muscle.",
    benefits: [
      "Supports heart health",
      "Helps manage blood pressure",
      "Strengthens heart muscle",
      "Improves circulation",
      "Reduces cholesterol",
    ],
    tags: ["Heart Health", "Blood Pressure", "Circulation", "Cholesterol"],
  },
]

// Daily tips array
const dailyTips = [
  "Start your day with warm water and lemon to boost digestion and detoxify your body naturally.",
  "Practice Pranayama (breathing exercises) for 10 minutes daily to reduce stress and improve lung capacity.",
  "Eat your largest meal at lunch when your digestive fire (Agni) is strongest according to Ayurveda.",
  "Massage your body with warm sesame oil before bathing to nourish skin and calm the nervous system.",
  "Go to bed before 10 PM and wake up before sunrise to align with natural circadian rhythms.",
  "Chew your food thoroughly - aim for 20-30 chews per bite for better digestion and nutrient absorption.",
  "Drink warm water throughout the day instead of cold water to support digestive health.",
  "Practice gratitude daily - write down 3 things you're grateful for each morning to improve mental health.",
  "Include all six tastes (sweet, sour, salty, pungent, bitter, astringent) in your meals for balance.",
  "Take a short walk after meals to aid digestion and prevent sluggishness.",
  "Use copper vessels for storing water overnight - drink this copper-infused water in the morning.",
  "Practice oil pulling with sesame or coconut oil for 10-15 minutes for oral health.",
  "Eat seasonal and local foods to stay in harmony with nature's cycles and get optimal nutrition.",
  "Keep your meals simple with 3-4 ingredients to avoid overwhelming your digestive system.",
  "Practice mindful eating - eat without distractions like TV or phone to improve digestion.",
  "Include turmeric in your daily diet for its powerful anti-inflammatory and healing properties.",
  "Take time for silence and meditation daily, even if just for 5 minutes to calm the mind.",
  "Sleep on your left side to improve digestion and heart health according to Ayurvedic principles.",
  "Use natural cleaning products and avoid harsh chemicals in your home environment.",
  "Connect with nature daily - spend at least 15 minutes outdoors for mental and physical health.",
  "Practice self-massage (Abhyanga) with warm oil 2-3 times per week for overall wellness.",
  "Avoid ice-cold drinks and foods as they weaken digestive fire and slow metabolism.",
  "Include fresh ginger in your diet to boost immunity, aid digestion, and reduce inflammation.",
  "Practice deep belly breathing when feeling stressed or anxious for immediate relief.",
  "Keep your living space clean and clutter-free for mental clarity and positive energy flow.",
]

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

// Main initialization function
function initializeApp() {
  // Hide loading screen after 2 seconds
  setTimeout(() => {
    const loadingScreen = document.getElementById("loadingScreen")
    if (loadingScreen) {
      loadingScreen.classList.add("hidden")
    }
  }, 2000)

  // Initialize all components
  initializeNavigation()
  initializeSearch()
  initializeDailyTip()
  initializeContactForm()
  initializeDoshaQuiz()
  initializeHerbs()
  initializeTheme()
  initializeScrollToTop()
  initializeVoiceSearch()

  // Create search suggestions
  createSearchSuggestions()

  // Show home section by default
  showSection("home")

  // Initialize animations
  initializeAnimations()
}

// Navigation functionality
function initializeNavigation() {
  const hamburger = document.getElementById("hamburger")
  const navMenu = document.getElementById("navMenu")
  const navLinks = document.querySelectorAll(".nav-link")

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navMenu.classList.toggle("active")
    })
  }

  // Handle navigation clicks
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const section = link.getAttribute("data-section")
      if (section) {
        showSection(section)

        // Close mobile menu
        if (hamburger && navMenu) {
          hamburger.classList.remove("active")
          navMenu.classList.remove("active")
        }
      }
    })
  })
}

// Show section function
function showSection(sectionName) {
  // Hide all sections
  const sections = document.querySelectorAll(".section")
  sections.forEach((section) => {
    section.classList.remove("active")
  })

  // Show target section
  const targetSection = document.getElementById(sectionName)
  if (targetSection) {
    targetSection.classList.add("active")
    currentSection = sectionName
  }

  // Update navigation
  updateNavigation(sectionName)

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" })

  // Initialize section-specific functionality
  if (sectionName === "herbs") {
    displayHerbs()
  }
}

// Update navigation active state
function updateNavigation(activeSection) {
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("data-section") === activeSection) {
      link.classList.add("active")
    }
  })
}

// Search functionality
function initializeSearch() {
  const searchInput = document.getElementById("searchInput")
  const heroSearchInput = document.getElementById("heroSearchInput")
  const herbsSearchInput = document.getElementById("herbsSearchInput")

  // Add event listeners for search inputs
  if (searchInput) {
    searchInput.addEventListener("input", handleSearchInput)
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        performSearch()
      }
    })
  }

  if (heroSearchInput) {
    heroSearchInput.addEventListener("input", handleHeroSearchInput)
    heroSearchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        performHeroSearch()
      }
    })
  }

  if (herbsSearchInput) {
    herbsSearchInput.addEventListener("input", handleHerbsSearch)
    herbsSearchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        searchHerbs()
      }
    })
  }

  // Hide suggestions when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-container") && !e.target.closest(".search-input-container")) {
      hideAllSuggestions()
    }
  })
}

// Create search suggestions array
function createSearchSuggestions() {
  searchSuggestions = []
  diseases.forEach((disease) => {
    searchSuggestions.push(disease.name.toLowerCase())
    if (disease.aliases) {
      disease.aliases.forEach((alias) => {
        searchSuggestions.push(alias.toLowerCase())
      })
    }
  })

  // Remove duplicates
  searchSuggestions = [...new Set(searchSuggestions)]
}

// Handle search input with suggestions
function handleSearchInput(e) {
  const query = e.target.value.toLowerCase().trim()
  showSearchSuggestions(query, "searchSuggestions")
}

// Handle hero search input
function handleHeroSearchInput(e) {
  const query = e.target.value.toLowerCase().trim()
  showSearchSuggestions(query, "heroSuggestions")
}

// Handle herbs search input
function handleHerbsSearch(e) {
  const query = e.target.value.toLowerCase().trim()
  if (query.length >= 2) {
    const filteredHerbs = herbs.filter(
      (herb) =>
        herb.name.toLowerCase().includes(query) ||
        herb.scientific.toLowerCase().includes(query) ||
        herb.benefits.some((benefit) => benefit.toLowerCase().includes(query)) ||
        herb.tags.some((tag) => tag.toLowerCase().includes(query)),
    )
    displayFilteredHerbs(filteredHerbs)
  } else {
    displayHerbs()
  }
}

// Show search suggestions
function showSearchSuggestions(query, containerId) {
  const suggestionsDiv = document.getElementById(containerId)
  if (!suggestionsDiv) return

  if (query.length < 2) {
    suggestionsDiv.style.display = "none"
    return
  }

  const matches = searchSuggestions.filter((suggestion) => suggestion.includes(query)).slice(0, 5)

  if (matches.length > 0) {
    suggestionsDiv.innerHTML = matches
      .map(
        (match) =>
          `<div class="suggestion-item" onclick="selectSuggestion('${match}', '${containerId}')">${match}</div>`,
      )
      .join("")
    suggestionsDiv.style.display = "block"
  } else {
    suggestionsDiv.style.display = "none"
  }
}

// Select suggestion
function selectSuggestion(suggestion, containerId) {
  if (containerId === "heroSuggestions") {
    document.getElementById("heroSearchInput").value = suggestion
    performHeroSearch()
  } else {
    document.getElementById("searchInput").value = suggestion
    performSearch()
  }
  hideAllSuggestions()
}

// Hide all suggestions
function hideAllSuggestions() {
  const suggestionDivs = ["searchSuggestions", "heroSuggestions"]
  suggestionDivs.forEach((id) => {
    const div = document.getElementById(id)
    if (div) div.style.display = "none"
  })
}

// Perform hero search
function performHeroSearch() {
  const heroSearchInput = document.getElementById("heroSearchInput")
  const query = heroSearchInput.value.trim()

  if (query) {
    showSection("search")
    setTimeout(() => {
      document.getElementById("searchInput").value = query
      performSearch()
    }, 100)
  }
}

// Main search function
function performSearch() {
  const searchInput = document.getElementById("searchInput")
  const query = searchInput.value.trim()

  if (!query) {
    showToast("Please enter a search term", "error")
    return
  }

  searchDisease(query)
}

// Search disease function
function searchDisease(query) {
  const searchResults = document.getElementById("searchResults")
  if (!searchResults) return

  const searchTerm = query.toLowerCase().trim()

  // Show loading
  showSearchLoading()

  setTimeout(() => {
    // Find matching disease
    const disease = diseases.find((d) => {
      return (
        d.name.toLowerCase() === searchTerm ||
        (d.aliases && d.aliases.some((alias) => alias.toLowerCase() === searchTerm)) ||
        d.name.toLowerCase().includes(searchTerm) ||
        (d.aliases && d.aliases.some((alias) => alias.toLowerCase().includes(searchTerm)))
      )
    })

    if (disease) {
      displayDiseaseResult(disease)
    } else {
      displayNoResults(searchTerm)
    }

    // Scroll to results
    searchResults.scrollIntoView({ behavior: "smooth" })
  }, 1000)
}

// Show search loading
function showSearchLoading() {
  const searchResults = document.getElementById("searchResults")
  if (!searchResults) return

  searchResults.innerHTML = `
    <div class="search-loading">
      <div class="loading-spinner"></div>
      <h3>Searching Natural Remedies...</h3>
      <p>Finding the best Ayurvedic solutions for your health concern</p>
    </div>
  `
}

// Display disease result
function displayDiseaseResult(disease) {
  const searchResults = document.getElementById("searchResults")
  if (!searchResults) return

  const remediesHtml = disease.remedies.map((remedy) => `<li>${remedy}</li>`).join("")

  const medicinesHtml = disease.medicines.map((medicine) => `<li>${medicine}</li>`).join("")

  const exercisesHtml = disease.exercises.map((exercise) => `<li>${exercise}</li>`).join("")

  const dietHtml = disease.diet.map((item) => `<li>${item}</li>`).join("")

  const lifestyleHtml = disease.lifestyle ? disease.lifestyle.map((item) => `<li>${item}</li>`).join("") : ""

  const precautionsHtml = disease.precautions.map((precaution) => `<li>${precaution}</li>`).join("")

  searchResults.innerHTML = `
    <div class="disease-result">
      <div class="disease-header">
        <h1 class="disease-title">${disease.name}</h1>
        <p class="disease-description">${disease.description}</p>
        <div class="disease-meta">
          <span class="meta-tag category-${disease.category}">${disease.category}</span>
          <span class="meta-tag severity-${disease.severity}">${disease.severity}</span>
          <span class="meta-tag time-${disease.treatmentTime}">${disease.treatmentTime} term</span>
        </div>
      </div>

      <div class="remedy-sections">
        <div class="remedy-section">
          <h2 class="section-title">🌱 Natural Home Remedies</h2>
          <ul class="remedy-list">${remediesHtml}</ul>
        </div>

        <div class="remedy-section">
          <h2 class="section-title">💊 Ayurvedic Medicines</h2>
          <ul class="remedy-list">${medicinesHtml}</ul>
        </div>

        <div class="remedy-section">
          <h2 class="section-title">🧘 Recommended Exercises</h2>
          <ul class="remedy-list">${exercisesHtml}</ul>
        </div>

        <div class="remedy-section">
          <h2 class="section-title">🥗 Dietary Guidelines</h2>
          <ul class="remedy-list">${dietHtml}</ul>
        </div>

        ${
          lifestyleHtml
            ? `<div class="remedy-section">
          <h2 class="section-title">🏠 Lifestyle Recommendations</h2>
          <ul class="remedy-list">${lifestyleHtml}</ul>
        </div>`
            : ""
        }
      </div>

      <div class="precautions">
        <h3>⚠️ Important Precautions</h3>
        <ul>${precautionsHtml}</ul>
      </div>

      <div class="disclaimer">
        <h4>📋 Medical Disclaimer</h4>
        <p>This information is for educational purposes only and should not replace professional medical advice. Always consult with qualified healthcare providers before starting any treatment or making significant changes to your health routine.</p>
      </div>

      <div class="result-actions">
        <button class="btn btn-primary" onclick="bookmarkRemedy('${disease.name}')">
          <span class="btn-icon">🔖</span>
          <span>Bookmark</span>
        </button>
        <button class="btn btn-outline" onclick="shareRemedy('${disease.name}')">
          <span class="btn-icon">📤</span>
          <span>Share</span>
        </button>
        <button class="btn btn-outline" onclick="printRemedy()">
          <span class="btn-icon">🖨️</span>
          <span>Print</span>
        </button>
        <button class="btn btn-outline" onclick="showSection('contact')">
          <span class="btn-icon">💬</span>
          <span>Ask Expert</span>
        </button>
      </div>
    </div>
  `
}

// Display no results
function displayNoResults(searchTerm) {
  const searchResults = document.getElementById("searchResults")
  if (!searchResults) return

  const suggestions = diseases.filter((d) => d.name.toLowerCase().includes(searchTerm.split(" ")[0])).slice(0, 3)

  const suggestionsHtml = suggestions
    .map(
      (disease) => `<button class="category-tag" onclick="searchDisease('${disease.name}')">${disease.name}</button>`,
    )
    .join("")

  searchResults.innerHTML = `
    <div class="no-results">
      <h2>No Results Found</h2>
      <p>We couldn't find specific information for "${searchTerm}". Try searching with different terms or browse our popular remedies below.</p>
      
      ${
        suggestionsHtml
          ? `<div class="search-suggestions-section">
        <h3>Did you mean:</h3>
        <div class="category-tags">${suggestionsHtml}</div>
      </div>`
          : ""
      }
      
      <div class="search-suggestions-section">
        <h3>Popular Searches:</h3>
        <div class="category-tags">
          <button class="category-tag" onclick="searchDisease('cold')">Cold & Cough</button>
          <button class="category-tag" onclick="searchDisease('acidity')">Acidity</button>
          <button class="category-tag" onclick="searchDisease('headache')">Headache</button>
          <button class="category-tag" onclick="searchDisease('joint pain')">Joint Pain</button>
          <button class="category-tag" onclick="searchDisease('diabetes')">Diabetes</button>
          <button class="category-tag" onclick="searchDisease('insomnia')">Insomnia</button>
        </div>
      </div>
      
      <div class="result-actions">
        <button class="btn btn-primary" onclick="showSection('contact')">
          <span class="btn-icon">💬</span>
          <span>Ask Our Experts</span>
        </button>
        <button class="btn btn-outline" onclick="showSection('herbs')">
          <span class="btn-icon">🌱</span>
          <span>Browse Herbs</span>
        </button>
      </div>
    </div>
  `
}

// Bookmark remedy function
function bookmarkRemedy(diseaseName) {
  if (!bookmarkedRemedies.includes(diseaseName)) {
    bookmarkedRemedies.push(diseaseName)
    localStorage.setItem("bookmarkedRemedies", JSON.stringify(bookmarkedRemedies))
    showToast("Remedy bookmarked successfully!", "success")
  } else {
    showToast("Remedy already bookmarked", "info")
  }
}

// Share remedy function
function shareRemedy(diseaseName) {
  if (navigator.share) {
    navigator
      .share({
        title: `Natural Remedy for ${diseaseName}`,
        text: `Check out this natural Ayurvedic remedy for ${diseaseName}`,
        url: window.location.href,
      })
      .catch((error) => console.log("Error sharing:", error))
  } else {
    // Fallback for browsers that don't support Web Share API
    const url = window.location.href
    navigator.clipboard
      .writeText(`Natural Remedy for ${diseaseName}: ${url}`)
      .then(() => {
        showToast("Link copied to clipboard!", "success")
      })
      .catch(() => {
        showToast("Unable to copy link", "error")
      })
  }
}

// Print remedy function
function printRemedy() {
  window.print()
}

// Daily tip functionality
function initializeDailyTip() {
  displayDailyTip()
}

function displayDailyTip() {
  const tipElement = document.getElementById("dailyTip")
  if (tipElement) {
    const randomTip = dailyTips[Math.floor(Math.random() * dailyTips.length)]
    tipElement.textContent = randomTip
  }
}

function getNewTip() {
  displayDailyTip()
  showToast("New tip loaded!", "success")
}

function shareTip() {
  const tipText = document.getElementById("dailyTip").textContent
  if (navigator.share) {
    navigator
      .share({
        title: "Daily Ayurvedic Wisdom",
        text: tipText,
        url: window.location.href,
      })
      .catch((error) => console.log("Error sharing:", error))
  } else {
    navigator.clipboard
      .writeText(`Daily Ayurvedic Wisdom: ${tipText}`)
      .then(() => {
        showToast("Tip copied to clipboard!", "success")
      })
      .catch(() => {
        showToast("Unable to copy tip", "error")
      })
  }
}

// Contact form functionality
function initializeContactForm() {
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactSubmit)
  }
}

function handleContactSubmit(e) {
  e.preventDefault()

  const submitBtn = e.target.querySelector(".submit-btn")
  const btnText = submitBtn.querySelector(".btn-text")
  const btnLoading = submitBtn.querySelector(".btn-loading")
  const formMessage = document.getElementById("formMessage")

  // Show loading state
  submitBtn.disabled = true
  btnText.style.display = "none"
  btnLoading.style.display = "flex"

  // Simulate form submission
  setTimeout(() => {
    // Reset button state
    submitBtn.disabled = false
    btnText.style.display = "inline"
    btnLoading.style.display = "none"

    // Show success message
    formMessage.innerHTML = `
      <div class="success-message">
        <span class="message-icon">✅</span>
        <div>
          <h4>Message Sent Successfully!</h4>
          <p>Thank you for contacting us. We'll get back to you within 24 hours.</p>
        </div>
      </div>
    `
    formMessage.className = "form-message success"
    formMessage.style.display = "block"

    // Reset form
    e.target.reset()

    // Show toast
    showToast("Message sent successfully!", "success")

    // Hide message after 5 seconds
    setTimeout(() => {
      formMessage.style.display = "none"
    }, 5000)
  }, 2000)
}

// Social media functions
function openSocial(platform) {
  const urls = {
    facebook: "https://facebook.com/ayurvedasolutions",
    instagram: "https://instagram.com/ayurvedasolutions",
    twitter: "https://twitter.com/ayurvedasolutions",
    youtube: "https://youtube.com/ayurvedasolutions",
  }

  if (urls[platform]) {
    window.open(urls[platform], "_blank")
  }
}

// Dosha quiz functionality
function initializeDoshaQuiz() {
  resetQuiz()
}

function resetQuiz() {
  currentQuizQuestion = 0
  quizAnswers = []
  doshaScores = { vata: 0, pitta: 0, kapha: 0 }
  displayQuestion()
}

function displayQuestion() {
  const questionElement = document.getElementById("questionText")
  const optionsElement = document.getElementById("quizOptions")
  const progressFill = document.getElementById("progressFill")
  const progressText = document.getElementById("progressText")
  const prevBtn = document.getElementById("prevBtn")
  const nextBtn = document.getElementById("nextBtn")

  if (!questionElement || !optionsElement) return

  const question = doshaQuestions[currentQuizQuestion]
  if (!question) return

  // Update progress
  const progress = ((currentQuizQuestion + 1) / doshaQuestions.length) * 100
  if (progressFill) progressFill.style.width = `${progress}%`
  if (progressText) progressText.textContent = `Question ${currentQuizQuestion + 1} of ${doshaQuestions.length}`

  // Display question
  questionElement.textContent = question.question

  // Display options
  optionsElement.innerHTML = question.options
    .map(
      (option, index) => `
    <div class="quiz-option" onclick="selectOption(${index})">
      <input type="radio" name="question${currentQuizQuestion}" value="${index}" id="option${index}">
      <label for="option${index}">${option.text}</label>
    </div>
  `,
    )
    .join("")

  // Update navigation buttons
  if (prevBtn) prevBtn.disabled = currentQuizQuestion === 0
  if (nextBtn) {
    nextBtn.disabled = true
    nextBtn.textContent = currentQuizQuestion === doshaQuestions.length - 1 ? "Finish Quiz" : "Next"
  }

  // Restore previous answer if exists
  if (quizAnswers[currentQuizQuestion] !== undefined) {
    selectOption(quizAnswers[currentQuizQuestion], false)
  }
}

function selectOption(optionIndex, updateAnswer = true) {
  const options = document.querySelectorAll(".quiz-option")
  const nextBtn = document.getElementById("nextBtn")

  // Update visual selection
  options.forEach((option, index) => {
    option.classList.toggle("selected", index === optionIndex)
    const radio = option.querySelector("input[type='radio']")
    if (radio) radio.checked = index === optionIndex
  })

  // Store answer
  if (updateAnswer) {
    quizAnswers[currentQuizQuestion] = optionIndex
  }

  // Enable next button
  if (nextBtn) nextBtn.disabled = false
}

function nextQuestion() {
  if (quizAnswers[currentQuizQuestion] === undefined) {
    showToast("Please select an answer", "warning")
    return
  }

  // Calculate score for current question
  const question = doshaQuestions[currentQuizQuestion]
  const selectedOption = question.options[quizAnswers[currentQuizQuestion]]
  doshaScores[selectedOption.dosha] += selectedOption.score

  if (currentQuizQuestion < doshaQuestions.length - 1) {
    currentQuizQuestion++
    displayQuestion()
  } else {
    showQuizResults()
  }
}

function previousQuestion() {
  if (currentQuizQuestion > 0) {
    // Subtract previous score
    const question = doshaQuestions[currentQuizQuestion]
    if (quizAnswers[currentQuizQuestion] !== undefined) {
      const selectedOption = question.options[quizAnswers[currentQuizQuestion]]
      doshaScores[selectedOption.dosha] -= selectedOption.score
    }

    currentQuizQuestion--
    displayQuestion()
  }
}

function showQuizResults() {
  const quizDiv = document.getElementById("doshaQuiz")
  const resultDiv = document.getElementById("doshaResult")

  if (!quizDiv || !resultDiv) return

  // Hide quiz, show results
  quizDiv.style.display = "none"
  resultDiv.style.display = "block"

  // Calculate percentages
  const totalScore = doshaScores.vata + doshaScores.pitta + doshaScores.kapha
  const percentages = {
    vata: Math.round((doshaScores.vata / totalScore) * 100),
    pitta: Math.round((doshaScores.pitta / totalScore) * 100),
    kapha: Math.round((doshaScores.kapha / totalScore) * 100),
  }

  // Find dominant dosha
  const dominantDosha = Object.keys(doshaScores).reduce((a, b) => (doshaScores[a] > doshaScores[b] ? a : b))

  // Display chart
  displayDoshaChart(percentages)

  // Display detailed results
  displayDoshaDetails(dominantDosha, percentages)
}

function displayDoshaChart(percentages) {
  const chartElement = document.getElementById("resultChart")
  if (!chartElement) return

  chartElement.innerHTML = `
    <div class="dosha-bar vata-bar-container">
      <div class="dosha-bar-label" style="color: #3498db;">Vata</div>
      <div class="dosha-bar-container">
        <div class="dosha-bar-fill vata-bar" style="height: ${(percentages.vata / 100) * 200}px;"></div>
      </div>
      <div class="dosha-percentage">${percentages.vata}%</div>
    </div>
    <div class="dosha-bar pitta-bar-container">
      <div class="dosha-bar-label" style="color: #e74c3c;">Pitta</div>
      <div class="dosha-bar-container">
        <div class="dosha-bar-fill pitta-bar" style="height: ${(percentages.pitta / 100) * 200}px;"></div>
      </div>
      <div class="dosha-percentage">${percentages.pitta}%</div>
    </div>
    <div class="dosha-bar kapha-bar-container">
      <div class="dosha-bar-label" style="color: #27ae60;">Kapha</div>
      <div class="dosha-bar-container">
        <div class="dosha-bar-fill kapha-bar" style="height: ${(percentages.kapha / 100) * 200}px;"></div>
      </div>
      <div class="dosha-percentage">${percentages.kapha}%</div>
    </div>
  `
}

function displayDoshaDetails(dominantDosha, percentages) {
  const detailsElement = document.getElementById("doshaDetails")
  if (!detailsElement) return

  const doshaInfo = {
    vata: {
      name: "Vata",
      element: "Air + Space",
      characteristics: "Movement, creativity, flexibility",
      balanced: "Energetic, creative, enthusiastic, flexible",
      imbalanced: "Anxious, restless, dry skin, constipation, insomnia",
      recommendations: [
        "Follow regular routines and meal times",
        "Eat warm, cooked foods and avoid cold, raw foods",
        "Practice calming activities like meditation and gentle yoga",
        "Get adequate rest and maintain regular sleep schedule",
        "Use warm oil massages to nourish the body",
        "Stay warm and avoid excessive cold or wind exposure",
      ],
    },
    pitta: {
      name: "Pitta",
      element: "Fire + Water",
      characteristics: "Transformation, intelligence, intensity",
      balanced: "Intelligent, focused, confident, good digestion",
      imbalanced: "Irritable, angry, acid reflux, skin rashes, inflammation",
      recommendations: [
        "Eat cooling foods and avoid spicy, oily, or acidic foods",
        "Practice moderation in all activities",
        "Avoid excessive heat and sun exposure",
        "Engage in calming activities and avoid competitive sports",
        "Practice cooling pranayama like Sheetali and Sheetkari",
        "Maintain work-life balance and avoid overworking",
      ],
    },
    kapha: {
      name: "Kapha",
      element: "Earth + Water",
      characteristics: "Structure, stability, immunity",
      balanced: "Calm, loving, patient, strong immunity",
      imbalanced: "Lethargic, overweight, congestion, depression",
      recommendations: [
        "Engage in regular vigorous exercise",
        "Eat light, warm, and spicy foods",
        "Avoid heavy, oily, and sweet foods",
        "Wake up early and avoid daytime napping",
        "Practice energizing pranayama like Bhastrika",
        "Seek variety and new experiences to avoid stagnation",
      ],
    },
  }

  const info = doshaInfo[dominantDosha]

  detailsElement.innerHTML = `
    <div class="dosha-result-card ${dominantDosha}-card">
      <div class="result-summary">
        <h3>Your Dominant Dosha: ${info.name}</h3>
        <p class="dosha-elements">${info.element}</p>
        <p class="dosha-description">${info.characteristics}</p>
      </div>
      
      <div class="dosha-breakdown">
        <h4>Your Dosha Composition:</h4>
        <ul>
          <li>Vata: ${percentages.vata}% - ${percentages.vata > 40 ? "High" : percentages.vata > 25 ? "Moderate" : "Low"}</li>
          <li>Pitta: ${percentages.pitta}% - ${percentages.pitta > 40 ? "High" : percentages.pitta > 25 ? "Moderate" : "Low"}</li>
          <li>Kapha: ${percentages.kapha}% - ${percentages.kapha > 40 ? "High" : percentages.kapha > 25 ? "Moderate" : "Low"}</li>
        </ul>
      </div>
      
      <div class="dosha-states">
        <div class="balanced-state">
          <h4>When ${info.name} is Balanced:</h4>
          <p>${info.balanced}</p>
        </div>
        
        <div class="imbalanced-state">
          <h4>When ${info.name} is Imbalanced:</h4>
          <p>${info.imbalanced}</p>
        </div>
      </div>
      
      <div class="dosha-recommendations">
        <h4>Personalized Recommendations for ${info.name} Types:</h4>
        <ul>
          ${info.recommendations.map((rec) => `<li>${rec}</li>`).join("")}
        </ul>
      </div>
    </div>
  `
}

function retakeQuiz() {
  const quizDiv = document.getElementById("doshaQuiz")
  const resultDiv = document.getElementById("doshaResult")

  if (quizDiv && resultDiv) {
    resultDiv.style.display = "none"
    quizDiv.style.display = "block"
    resetQuiz()
  }
}

function downloadResults() {
  // Create a simple text version of results for download
  const dominantDosha = Object.keys(doshaScores).reduce((a, b) => (doshaScores[a] > doshaScores[b] ? a : b))

  const totalScore = doshaScores.vata + doshaScores.pitta + doshaScores.kapha
  const percentages = {
    vata: Math.round((doshaScores.vata / totalScore) * 100),
    pitta: Math.round((doshaScores.pitta / totalScore) * 100),
    kapha: Math.round((doshaScores.kapha / totalScore) * 100),
  }

  const resultText = `
AYURVEDIC DOSHA ASSESSMENT RESULTS
Generated on: ${new Date().toLocaleDateString()}

YOUR DOSHA COMPOSITION:
- Vata: ${percentages.vata}%
- Pitta: ${percentages.pitta}%
- Kapha: ${percentages.kapha}%

DOMINANT DOSHA: ${dominantDosha.toUpperCase()}

This assessment provides insights into your Ayurvedic constitution.
For personalized recommendations, consult with a qualified Ayurvedic practitioner.

Visit AyurVeda Solutions for more information: ${window.location.origin}
  `

  const blob = new Blob([resultText], { type: "text/plain" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "dosha-assessment-results.txt"
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)

  showToast("Results downloaded successfully!", "success")
}

function shareResults() {
  const dominantDosha = Object.keys(doshaScores).reduce((a, b) => (doshaScores[a] > doshaScores[b] ? a : b))

  const shareText = `I just discovered my Ayurvedic dosha! My dominant dosha is ${dominantDosha}. Take the quiz yourself at AyurVeda Solutions!`

  if (navigator.share) {
    navigator
      .share({
        title: "My Ayurvedic Dosha Results",
        text: shareText,
        url: window.location.href,
      })
      .catch((error) => console.log("Error sharing:", error))
  } else {
    navigator.clipboard
      .writeText(shareText + " " + window.location.href)
      .then(() => {
        showToast("Results copied to clipboard!", "success")
      })
      .catch(() => {
        showToast("Unable to copy results", "error")
      })
  }
}

// Herbs functionality
function initializeHerbs() {
  displayHerbs()
}

function displayHerbs() {
  displayFilteredHerbs(herbs)
}

function displayFilteredHerbs(herbsToShow) {
  const herbsGrid = document.getElementById("herbsGrid")
  if (!herbsGrid) return

  if (herbsToShow.length === 0) {
    herbsGrid.innerHTML = `
      <div class="no-herbs-found">
        <h3>No herbs found</h3>
        <p>Try adjusting your search or filter criteria.</p>
      </div>
    `
    return
  }

  herbsGrid.innerHTML = herbsToShow
    .map(
      (herb) => `
    <div class="herb-card">
      <div class="herb-header">
        <div class="herb-icon">${herb.icon}</div>
        <div class="herb-info">
          <h3 class="herb-name">${herb.name}</h3>
          <p class="herb-scientific">${herb.scientific}</p>
        </div>
      </div>
      <p class="herb-description">${herb.description}</p>
      <div class="herb-benefits">
        <h4>Key Benefits:</h4>
        <ul>
          ${herb.benefits.map((benefit) => `<li>${benefit}</li>`).join("")}
        </ul>
      </div>
      <div class="herb-tags">
        ${herb.tags.map((tag) => `<span class="herb-tag">${tag}</span>`).join("")}
      </div>
    </div>
  `,
    )
    .join("")
}

function filterHerbs(category) {
  // Update active filter tab
  const filterTabs = document.querySelectorAll(".filter-tab")
  filterTabs.forEach((tab) => {
    tab.classList.remove("active")
  })
  event.target.classList.add("active")

  // Filter herbs
  let filteredHerbs
  if (category === "all") {
    filteredHerbs = herbs
  } else {
    filteredHerbs = herbs.filter((herb) => herb.category === category)
  }

  displayFilteredHerbs(filteredHerbs)
}

function searchHerbs() {
  const searchInput = document.getElementById("herbsSearchInput")
  const query = searchInput.value.toLowerCase().trim()

  if (query.length >= 2) {
    const filteredHerbs = herbs.filter(
      (herb) =>
        herb.name.toLowerCase().includes(query) ||
        herb.scientific.toLowerCase().includes(query) ||
        herb.benefits.some((benefit) => benefit.toLowerCase().includes(query)) ||
        herb.tags.some((tag) => tag.toLowerCase().includes(query)),
    )
    displayFilteredHerbs(filteredHerbs)
  } else {
    displayHerbs()
  }
}

// Theme functionality
function initializeTheme() {
  const themeToggle = document.getElementById("themeToggle")
  const savedTheme = localStorage.getItem("theme") || "light"

  // Set initial theme
  setTheme(savedTheme)

  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme)
  }
}

function toggleTheme() {
  const newTheme = currentTheme === "light" ? "dark" : "light"
  setTheme(newTheme)
}

function setTheme(theme) {
  currentTheme = theme
  document.documentElement.setAttribute("data-theme", theme)
  localStorage.setItem("theme", theme)

  const themeIcon = document.querySelector(".theme-icon")
  if (themeIcon) {
    themeIcon.textContent = theme === "light" ? "🌙" : "☀️"
  }
}

// Scroll to top functionality
function initializeScrollToTop() {
  const scrollToTopBtn = document.getElementById("scrollToTop")

  if (scrollToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add("visible")
      } else {
        scrollToTopBtn.classList.remove("visible")
      }
    })
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

// Voice search functionality
function initializeVoiceSearch() {
  if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
    // Voice search is supported
    const voiceButtons = document.querySelectorAll(".voice-search, .voice-btn")
    voiceButtons.forEach((btn) => {
      btn.style.display = "flex"
    })
  } else {
    // Hide voice search buttons if not supported
    const voiceButtons = document.querySelectorAll(".voice-search, .voice-btn")
    voiceButtons.forEach((btn) => {
      btn.style.display = "none"
    })
  }
}

function startVoiceSearch(context = "search") {
  if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
    showToast("Voice search not supported in this browser", "error")
    return
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  const recognition = new SpeechRecognition()

  recognition.continuous = false
  recognition.interimResults = false
  recognition.lang = "en-US"

  const voiceBtn = document.querySelector(
    `#${context === "hero" ? "heroSearchInput" : "searchInput"} + .search-btn + .voice-btn`,
  )

  if (voiceBtn) {
    voiceBtn.style.background = "var(--error-color)"
    voiceBtn.querySelector(".voice-icon").textContent = "🔴"
  }

  recognition.onstart = () => {
    isVoiceSearchActive = true
    showToast("Listening... Speak now", "info")
  }

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript

    if (context === "hero") {
      document.getElementById("heroSearchInput").value = transcript
      performHeroSearch()
    } else {
      document.getElementById("searchInput").value = transcript
      performSearch()
    }

    showToast(`Heard: "${transcript}"`, "success")
  }

  recognition.onerror = (event) => {
    showToast("Voice search error: " + event.error, "error")
  }

  recognition.onend = () => {
    isVoiceSearchActive = false
    if (voiceBtn) {
      voiceBtn.style.background = "var(--gradient-accent)"
      voiceBtn.querySelector(".voice-icon").textContent = "🎤"
    }
  }

  recognition.start()
}

// Toast notification system
function showToast(message, type = "info") {
  const toast = document.getElementById("toast")
  const toastMessage = toast.querySelector(".toast-message")
  const toastIcon = toast.querySelector(".toast-icon")

  // Set message and icon based on type
  toastMessage.textContent = message

  const icons = {
    success: "✅",
    error: "❌",
    warning: "⚠️",
    info: "ℹ️",
  }

  const colors = {
    success: "var(--success-color)",
    error: "var(--error-color)",
    warning: "var(--warning-color)",
    info: "var(--info-color)",
  }

  toastIcon.textContent = icons[type] || icons.info
  toast.style.background = colors[type] || colors.info

  // Show toast
  toast.classList.add("show")

  // Hide toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove("show")
  }, 3000)
}

// Animation initialization
function initializeAnimations() {
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    ".quick-card, .feature-card, .principle-card, .herb-card, .dosha-card",
  )

  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
}

// Utility functions for additional features
function showHealthCalculator() {
  showToast("Health Calculator feature coming soon!", "info")
}

function showSeasonalTips() {
  showToast("Seasonal Tips feature coming soon!", "info")
}

function showRecipes() {
  showToast("Ayurvedic Recipes feature coming soon!", "info")
}

function showExercises() {
  showToast("Yoga Exercises feature coming soon!", "info")
}

function showMeditation() {
  showToast("Meditation Guide feature coming soon!", "info")
}

function showFAQ() {
  showToast("FAQ section coming soon!", "info")
}

// Error handling
window.addEventListener("error", (event) => {
  console.error("JavaScript error:", event.error)
  showToast("An error occurred. Please refresh the page.", "error")
})

// Service worker registration (for future PWA features)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // Service worker registration would go here
    console.log("Service worker support detected")
  })
}

// Export functions for global access
window.showSection = showSection
window.searchDisease = searchDisease
window.performSearch = performSearch
window.performHeroSearch = performHeroSearch
window.selectSuggestion = selectSuggestion
window.bookmarkRemedy = bookmarkRemedy
window.shareRemedy = shareRemedy
window.printRemedy = printRemedy
window.getNewTip = getNewTip
window.shareTip = shareTip
window.openSocial = openSocial
window.selectOption = selectOption
window.nextQuestion = nextQuestion
window.previousQuestion = previousQuestion
window.retakeQuiz = retakeQuiz
window.downloadResults = downloadResults
window.shareResults = shareResults
window.filterHerbs = filterHerbs
window.searchHerbs = searchHerbs
window.scrollToTop = scrollToTop
window.startVoiceSearch = startVoiceSearch
window.showHealthCalculator = showHealthCalculator
window.showSeasonalTips = showSeasonalTips
window.showRecipes = showRecipes
window.showExercises = showExercises
window.showMeditation = showMeditation
window.showFAQ = showFAQ
