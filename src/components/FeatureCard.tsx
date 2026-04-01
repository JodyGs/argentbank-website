interface FeatureCardProps {
  icon: string
  iconAlt: string
  title: string
  description: string
}

export default function FeatureCard({ icon, iconAlt, title, description }: FeatureCardProps) {
  return (
    <div className="feature-item">
      <img src={icon} alt={iconAlt} className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{description}</p>
    </div>
  )
}
