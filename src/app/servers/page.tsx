"use client";

import React, { useEffect, useState } from "react";
import { Flex } from "@/once-ui/components";
import Image from "next/image";

interface Activity {
  name: string;
  state: string;
  details: string;
  type: number;
  timestamps: {
    start: string;
    end: string;
  };
  assets: {
    large_image: string;
    large_text: string;
  };
  emoji?: {
    name: string;
    id: string;
    animated: boolean;
  };
}

interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  status: string;
  statusEmoji?: {
    name: string;
    id: string;
    animated: boolean;
  };
  customStatus?: string;
  activities: Activity[];
  animatedAvatar?: string;
  banner?: string | undefined | null;
  avatarDecoration?: {
    asset: string;
  };
}

const DEFAULT_USER: User = {
  id: "default",
  username: "Unknown User",
  displayName: "Unknown",
  avatar: "https://cdn.discordapp.com/embed/avatars/0.png",
  status: "offline",
  activities: [],
};

// Activity type mapping
const activityTypes: Record<number, string> = {
  0: "Playing",
  1: "Streaming",
  2: "Listening to",
  3: "Watching",
  4: "Custom Status",
  5: "Competing in",
};

export default function UserCard() {
  const [user, setUser] = useState<User>(DEFAULT_USER);
  const [error, setError] = useState<string | null>(null);
  const [isAnimated, setIsAnimated] = useState(false);

  const fetchUser = async () => {
    try {
      const response = await fetch("/api/discord", { cache: "no-store" });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();

      // Extract username and displayName from API
      const username = data.data.discord_user.username || "Unknown";
      const displayName = data.data.discord_user.global_name || username;

      // Find custom status activity if exists
      const customStatusActivity = data.data.activities.find(
        (activity: any) => activity.type === 4
      );

      // Banner URL'sini direkt olarak kullan
      const banner = data.data.discord_user.banner || null;

      const userData: User = {
        id: data.data.discord_user.id,
        username: username,
        displayName: displayName,
        avatar: data.data.discord_user.avatar,
        status: data.data.discord_status,
        statusEmoji: customStatusActivity?.emoji || null,
        customStatus: customStatusActivity?.state || null,
        activities: data.data.activities.map((activity: any) => ({
          name: activity.name,
          state: activity.state,
          details: activity.details,
          type: activity.type,
          timestamps: activity.timestamps,
          assets: activity.assets,
          emoji: activity.emoji || null,
        })),
        animatedAvatar: data.data.discord_user.animated_avatar || null,
        banner: banner,
        avatarDecoration: data.data.discord_user.avatar_decoration_data || null,
      };

      setUser(userData);
      setError(null);
    } catch (err: any) {
      console.error("fetchUser: Error during fetch:", err);
      setError(`Failed to fetch user: ${err.message}`);
      setUser(DEFAULT_USER);
    }
  };

  // Toggle animation effect for avatar
  useEffect(() => {
    const animationInterval = setInterval(() => {
      setIsAnimated((prev) => !prev);
    }, 7000); // Toggle animation every 7 seconds

    return () => clearInterval(animationInterval);
  }, []);

  useEffect(() => {
    fetchUser();

    // Refresh data every 30 seconds
    const interval = setInterval(fetchUser, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "online":
        return "#3BA55D"; // Yeşil
      case "idle":
        return "#FAA61A"; // Sarı
      case "dnd":
        return "#ED4245"; // Kırmızı
      case "offline":
        return "#747F8D"; // Gri
      default:
        return "#747F8D"; // Varsayılan gri
    }
  };

  // Get emoji URL based on emoji data
  const getEmojiUrl = (emoji: any) => {
    if (!emoji) return undefined; // null yerine undefined döndür
    const baseUrl = "https://cdn.discordapp.com/emojis/";
    const extension = emoji.animated ? "gif" : "png";
    return `${baseUrl}${emoji.id}.${extension}`;
  };

  // Extract emoji from activity name
  const extractEmojiFromName = (name: string) => {
    const emojiRegex = /<a?:(\w+):(\d+)>/; // Discord emoji formatı: <:emoji_name:emoji_id>
    const match = name.match(emojiRegex);
    if (match) {
      return {
        name: match[1],
        id: match[2],
        animated: name.startsWith("<a:"), // Eğer <a: ile başlıyorsa animasyonlu
      };
    }
    return null;
  };

  return (
    <Flex fillWidth>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          padding: "2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#18191C",
            borderRadius: "8px",
            color: "white",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            maxWidth: "400px",
            position: "relative",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.02)";
            e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.2)";
          }}
        >
          {/* Banner at the top */}
          {user.banner && (
            <div
              style={{
                height: "80px",
                width: "100%",
                position: "relative",
              }}
            >
              <Image
                src={user.banner}
                alt="Banner"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          )}

          <div
            style={{
              padding: "16px",
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
            }}
          >
            <div style={{ position: "relative" }}>
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Image
                  src={user.animatedAvatar || user.avatar}
                  alt={user.username}
                  fill
                  style={{ objectFit: "cover" }}
                />
                {/* Avatar decoration */}
                {user.avatarDecoration?.asset && (
                  <Image
                    src={`https://cdn.discordapp.com/avatar-decoration-presets/${user.avatarDecoration.asset}.png?size=96&passthrough=true`}
                    alt="Avatar Decoration"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                )}
              </div>
              {/* Status indicator */}
              <div
                style={{
                  position: "absolute",
                  bottom: "0",
                  right: "0",
                  width: "20px",
                  height: "20px",
                  backgroundColor: getStatusColor(user.status),
                  borderRadius: "50%",
                  border: "3px solid #18191C",
                }}
              ></div>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "bold",
                    color: getStatusColor(user.status), // displayName rengi status rengi ile aynı
                  }}
                >
                  {user.displayName}
                </span>
                <span style={{ fontSize: "0.875rem", color: "#B9BBBE" }}>
                  {user.username}
                </span>

                {/* Custom status with emoji */}
                {user.customStatus && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "4px",
                    }}
                  >
                    {user.statusEmoji && (
                      <Image
                        src={getEmojiUrl(user.statusEmoji) || ""}
                        alt={user.statusEmoji.name}
                        width={16}
                        height={16}
                        style={{ marginRight: "4px" }}
                      />
                    )}
                    <span style={{ fontSize: "0.875rem", color: "#B9BBBE" }}>
                      {user.customStatus}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {user.activities.filter((activity) => activity.type !== 4).length >
            0 && (
            <div
              style={{
                padding: "0 16px 16px 16px",
                borderTop: "1px solid #2F3136",
              }}
            >
              {user.activities
                .filter((activity) => activity.type !== 4)
                .map((activity, index) => {
                  // Eğer emoji null ise, name içindeki emojiyi çıkar
                  const emoji =
                    activity.emoji || extractEmojiFromName(activity.name);

                  return (
                    <div key={index} style={{ marginTop: "12px" }}>
                      <span
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: "bold",
                          color: "#72767D",
                        }}
                      >
                        {activityTypes[activity.type] || ""} {activity.name}
                      </span>
                      {activity.details && (
                        <span
                          style={{
                            fontSize: "0.75rem",
                            color: "#B9BBBE",
                            display: "block",
                          }}
                        >
                          {activity.details}
                        </span>
                      )}
                      {activity.state && (
                        <span
                          style={{
                            fontSize: "0.75rem",
                            color: "#B9BBBE",
                            display: "block",
                          }}
                        >
                          {activity.state}
                        </span>
                      )}
                      {emoji && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginTop: "4px",
                          }}
                        >
                          <Image
                            src={getEmojiUrl(emoji) || ""}
                            alt={emoji.name}
                            width={16}
                            height={16}
                            style={{ marginRight: "4px" }}
                          />
                        </div>
                      )}
                      {activity.assets?.large_image && (
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            height: "160px",
                            marginTop: "8px",
                          }}
                        >
                          <Image
                            src={activity.assets.large_image}
                            alt={activity.assets.large_text || activity.name}
                            fill
                            style={{ objectFit: "cover", borderRadius: "4px" }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          )}
        </div>

        {error && (
          <div
            style={{
              color: "red",
              marginTop: "1rem",
              padding: "0.5rem",
              backgroundColor: "rgba(255,0,0,0.1)",
              borderRadius: "4px",
            }}
          >
            {error}
          </div>
        )}
      </div>
    </Flex>
  );
}